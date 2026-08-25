/**
 * Refreshes the NX Group figures quoted on the Nippon Express page.
 *
 * NX Group publishes its headline numbers — founding year, world ranking,
 * countries, locations, group companies, employees — in a "NX Group by the
 * Numbers" block on https://www.nipponexpress.com/about/. They are
 * server-rendered, so a plain fetch sees them; no browser is needed.
 *
 * Only the *numbers* are taken. The labels around them stay hand-written in
 * `en.ts` / `he.ts`, because the Hebrew side is separately authored copy and
 * nothing here can translate it. See `src/content/nx-figures.json`.
 *
 * This is deliberately NOT part of `bun run build`. A deploy that scrapes a
 * third party silently ships whatever that third party happened to serve, and
 * fails when they are down. It is run instead by `.github/actions/nx-validation`,
 * which opens a pull request when the numbers move so a person reviews them.
 *
 *   bun run scripts/fetch-nx-figures.ts          # write if changed
 *   bun run scripts/fetch-nx-figures.ts --check  # exit 1 if stale, write nothing
 */

import { appendFileSync } from 'node:fs'

const SOURCE = 'https://www.nipponexpress.com/about/'
const OUTPUT = 'src/content/nx-figures.json'

/**
 * How each figure is recognised in the page.
 *
 * Matching on the label rather than on column order means NX can add, drop or
 * reorder columns without silently shifting every number by one.
 */
const WANTED = {
  founded: /^since$/i,
  worldRank: /th in the world/i,
  countries: /countries\s*\/\s*regions/i,
  locations: /^locations$/i,
  groupCompanies: /^group companies$/i,
  employees: /^professionals$/i,
} as const

type FigureKey = keyof typeof WANTED

interface Figure {
  /** The number exactly as NX sets it, including any thousands separators and trailing "+". */
  value: string
  /** The footnote NX attaches to it ("As of December 2025", the A&A citation). Empty when there is none. */
  note: string
}

/** A figure NX publishes that the site does not carry, recorded so the deploy gate can see it offline. */
interface Untracked {
  label: string
  value: string
}

interface NxFigures {
  source: string
  figures: Record<FigureKey, Figure>
  /** Empty in the healthy case. Anything here fails `verify:translations`. */
  untracked: Untracked[]
}

/** One column of the numbers block, as scraped. */
interface Column {
  /** Text above the number. Carries the label for the founding year ("Since"). */
  prefix: string
  value: string
  /** Text below the number. Carries the label for every other figure. */
  label: string
  /** Footnote marker on the number, e.g. "*3". */
  marker: string
}

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
}

function decode(html: string): string {
  return html
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (whole, name: string) => ENTITIES[name.toLowerCase()] ?? whole)
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Collects the text of every element matching a selector, one entry per element.
 *
 * HTMLRewriter hands text over in chunks, so text is appended to the entry
 * opened by the most recent matching element rather than assumed to arrive whole.
 */
function textCollector(out: string[]) {
  return {
    element() {
      out.push('')
    },
    text(chunk: { text: string }) {
      if (out.length > 0) out[out.length - 1] += chunk.text
    },
  }
}

async function scrape(): Promise<NxFigures> {
  const response = await fetch(SOURCE, {
    headers: { 'user-agent': 'paragon-logistics-site/1.0 (+https://github.com/)' },
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok) {
    throw new Error(`${SOURCE} returned HTTP ${response.status} ${response.statusText}`)
  }
  const html = await response.text()

  const raw: Column[] = []
  const notes: string[] = []

  /**
   * Appends into the column currently being parsed.
   *
   * Fields are attributed to the open column rather than zipped by index,
   * because a column without a footnote emits no marker `<span>` at all — the
   * founding year is one — and index-zipping would shift every later note.
   */
  const field = (key: keyof Column) => ({
    text(chunk: { text: string }) {
      const column = raw[raw.length - 1]
      if (column) column[key] += chunk.text
    },
  })

  await new HTMLRewriter()
    .on('.numbersContent .numbersContentCol', {
      element() {
        raw.push({ prefix: '', value: '', label: '', marker: '' })
      },
    })
    .on('.numbersContentCol .numbersContentTxt1', field('prefix'))
    .on('.numbersContentCol .numbersContentTxt2 .js-countup', field('value'))
    .on('.numbersContentCol .numbersContentTxt2 span', field('marker'))
    .on('.numbersContentCol .numbersContentTxt3', field('label'))
    .on('.numbersNotes .numbersNotesItem', textCollector(notes))
    .transform(new Response(html))
    .text()

  const columns: Column[] = raw.map((c) => ({
    prefix: decode(c.prefix),
    value: decode(c.value),
    label: decode(c.label),
    marker: decode(c.marker),
  }))

  if (columns.length === 0) {
    throw new Error(
      `No figures found at ${SOURCE}. The "NX Group by the Numbers" markup has probably changed — ` +
        `check the .numbersContent selectors in this script.`,
    )
  }

  /** "*3" → "Total number of locations …", from the footnote list under the block. */
  const notesByMarker = new Map<string, string>()
  for (const raw of notes) {
    const note = decode(raw)
    const match = note.match(/^(\*\d+)\s*(.+)$/)
    if (match) notesByMarker.set(match[1]!, match[2]!.trim())
  }

  const figures = {} as Record<FigureKey, Figure>
  const missing: FigureKey[] = []
  const matched = new Set<Column>()

  for (const [key, pattern] of Object.entries(WANTED) as [FigureKey, RegExp][]) {
    // The founding year is labelled above the number; everything else below it.
    const column = columns.find((c) => pattern.test(c.label) || pattern.test(c.prefix))
    if (!column || !/^[\d][\d,]*\+?$/.test(column.value)) {
      missing.push(key)
      continue
    }
    matched.add(column)
    figures[key] = { value: column.value, note: notesByMarker.get(column.marker) ?? '' }
  }

  if (missing.length > 0) {
    throw new Error(
      `Could not read ${missing.join(', ')} from ${SOURCE}.\n` +
        `Scraped columns were:\n` +
        columns.map((c) => `  ${c.prefix} | ${c.value}${c.marker} | ${c.label}`).join('\n') +
        `\nUpdate the WANTED patterns in this script if NX relabelled the block.`,
    )
  }

  // A figure NX has started publishing that we do not carry. It is deliberately
  // not added to the site — a scraped English label has no Hebrew translation,
  // and inventing one is a person's decision, not this script's. So it is
  // recorded instead of used, and `verify:translations` fails the deploy on it.
  const unrecognised = columns.filter((c) => !matched.has(c) && c.value !== '')
  if (unrecognised.length > 0) {
    report(unrecognised)
  }

  const untracked = unrecognised.map((c) => ({
    label: c.label || c.prefix || '(unlabelled)',
    value: c.value,
  }))

  return { source: SOURCE, figures, untracked }
}

/** Surfaces figures NX publishes that this script does not track. */
function report(unrecognised: Column[]): void {
  const lines = unrecognised.map((c) => `${c.label || c.prefix || '(unlabelled)'}: ${c.value}`)

  console.warn(
    `\nNX now publishes ${unrecognised.length} figure(s) the site does not carry:\n` +
      lines.map((l) => `  ${l}`).join('\n') +
      `\nRecorded under "untracked" in the output file. The NX validation job reports\n` +
      `these and the weekly run keeps emailing until they are carried in both\n` +
      `languages; neither ever blocks a deploy.\n`,
  )

  // Makes the same information visible in the Actions run, not just the log.
  if (process.env.GITHUB_ACTIONS) {
    console.log(`::warning::NX publishes untracked figures — ${lines.join('; ')}`)
  }
  const summary = process.env.GITHUB_STEP_SUMMARY
  if (summary) {
    // Appended, not written — the summary file is shared by every step in the job.
    appendFileSync(
      summary,
      `### Untracked NX figures\n\n` +
        lines.map((l) => `- ${l}`).join('\n') +
        `\n\nAdd a label in both language files if these should appear on the site.\n`,
    )
  }
}

const checkOnly = process.argv.includes('--check')
const scraped = await scrape()

const existing = await Bun.file(OUTPUT)
  .json()
  .catch(() => null)

const serialise = (data: NxFigures) => JSON.stringify(data, null, 2) + '\n'
const next = serialise(scraped)

if (existing && serialise(existing as NxFigures) === next) {
  console.log(`NX figures unchanged — ${OUTPUT} is up to date.`)
  process.exit(0)
}

for (const [key, figure] of Object.entries(scraped.figures)) {
  const before = (existing as NxFigures | null)?.figures?.[key as FigureKey]?.value
  const arrow = before && before !== figure.value ? `${before} → ` : before ? '' : 'new: '
  console.log(`  ${key}: ${arrow}${figure.value}`)
}

if (checkOnly) {
  console.error(`\n${OUTPUT} is stale. Run: bun run scripts/fetch-nx-figures.ts`)
  process.exit(1)
}

await Bun.write(OUTPUT, next)
console.log(`\nWrote ${OUTPUT}.`)
