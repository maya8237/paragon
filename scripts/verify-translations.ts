/**
 * Deploy gate: refuses to ship information taken from NX Group that is not
 * carried in both languages.
 *
 * The site quotes NX Group's published figures. Two ways that can go wrong
 * without anything else noticing:
 *
 *   1. NX starts publishing a figure the site does not carry. The scraper
 *      records it under "untracked" rather than inventing a Hebrew label for
 *      it — see scripts/fetch-nx-figures.ts.
 *   2. A figure gets wired into one language file and not the other. The
 *      SiteContent type cannot catch this: it requires a `figures` array in
 *      both languages but says nothing about which values go in them, so
 *      English can quietly gain a number Hebrew never gets.
 *
 * Both fail the pipeline. Set the IGNORE_NX_INFORMATION repository variable to
 * "true" to downgrade them to warnings for a deploy that has to go out anyway.
 *
 * Runs entirely offline against committed files, so it cannot fail because
 * nipponexpress.com is slow or unreachable.
 *
 *   bun run verify:translations
 */

import data from '../src/content/nx-figures.json'
import { nx } from '../src/content/nx'

const LANGUAGES = [
  { name: 'English', path: 'src/content/en.ts' },
  { name: 'Hebrew', path: 'src/content/he.ts' },
] as const

/** GitHub repository variables arrive as strings; anything but an explicit "true" means do not ignore. */
const IGNORE = (process.env.IGNORE_NX_INFORMATION ?? 'false').trim().toLowerCase() === 'true'
const IN_ACTIONS = Boolean(process.env.GITHUB_ACTIONS)

interface Problem {
  title: string
  detail: string[]
  fix: string[]
}

const problems: Problem[] = []

// 1. Figures NX publishes that the site does not carry at all.
// Typed explicitly: in the healthy case the array is empty in the JSON, which
// TypeScript infers as never[], and the entries below would not type-check.
const untracked: { label: string; value: string }[] = data.untracked ?? []
if (untracked.length > 0) {
  problems.push({
    title: `NX Group publishes ${untracked.length} figure(s) this site does not carry`,
    detail: untracked.map((u) => `${u.label}: ${u.value}`),
    fix: [
      'Carry the figure on the Nippon Express page:',
      '',
      '  1. Add a key for it to WANTED in scripts/fetch-nx-figures.ts,',
      '     matching on its label text.',
      '  2. Expose it in src/content/nx.ts.',
      '  3. Write a label for it in BOTH src/content/en.ts and',
      '     src/content/he.ts — the Hebrew copy is separately authored, so no',
      '     tool can generate it.',
      '  4. Re-run: bun run nx:figures',
      '',
      'If the figure should not appear on the site at all, set the',
      'IGNORE_NX_INFORMATION repository variable to "true".',
    ],
  })
}

// 2. A figure wired into one language file but not the other.
const sources = await Promise.all(
  LANGUAGES.map(async (lang) => ({
    ...lang,
    text: await Bun.file(lang.path).text(),
  })),
)

// Presence per file, not per use site: this catches a figure wired into one
// language and entirely forgotten in the other, which is the way the drift
// actually happens. It will not notice a figure used twice in English and once
// in Hebrew — detecting that needs to understand the content tree, not the text.
const asymmetric: string[] = []
for (const key of Object.keys(nx)) {
  const used = sources.filter((s) => s.text.includes(`nx.${key}`))
  if (used.length > 0 && used.length < sources.length) {
    const missing = sources.filter((s) => !used.includes(s)).map((s) => `${s.name} (${s.path})`)
    asymmetric.push(`nx.${key} — used in ${used.map((s) => s.name).join(', ')}, missing from ${missing.join(', ')}`)
  }
}

if (asymmetric.length > 0) {
  problems.push({
    title: `${asymmetric.length} NX figure(s) appear in one language but not the other`,
    detail: asymmetric,
    fix: [
      'Add the figure to the language file that is missing it, with a label',
      'written in that language. Every number taken from NX must appear in',
      'both, or visitors reading one language get less information than the',
      'other.',
    ],
  })
}

if (problems.length === 0) {
  console.log('Translations verified — every NX Group figure is carried in both languages.')
  process.exit(0)
}

const level = IGNORE ? 'warning' : 'error'
const heading = IGNORE ? 'IGNORED — untranslated content' : 'FAILED — untranslated content'

console.error(`\n${'='.repeat(72)}\n${heading}\n${'='.repeat(72)}`)

for (const problem of problems) {
  console.error(`\n${problem.title}:\n`)
  for (const line of problem.detail) console.error(`    ${line}`)
  console.error(`\n  How to fix:\n`)
  for (const line of problem.fix) console.error(line ? `    ${line}` : '')

  if (IN_ACTIONS) {
    // Collapses to a single annotation line; %0A is how Actions encodes a newline.
    const summary = [problem.title, ...problem.detail].join('%0A')
    console.log(`::${level}::${summary}`)
  }
}

console.error(`\n${'-'.repeat(72)}`)
if (IGNORE) {
  console.error(
    'IGNORE_NX_INFORMATION is set to "true", so the deploy continues.\n' +
      'Unset it (or set it to "false") to make this a hard failure again.',
  )
  process.exit(0)
}

console.error(
  'Deploy stopped. Fix the above, or set the IGNORE_NX_INFORMATION repository\n' +
    'variable to "true" to ship anyway (Settings → Secrets and variables →\n' +
    'Actions → Variables).',
)
process.exit(1)
