/**
 * Build gate: refuses to ship a figure that exists in one language and not the
 * other.
 *
 * The SiteContent type cannot catch this. It requires a `figures` array in both
 * languages but says nothing about what goes in them, so English can quietly
 * gain a number that Hebrew never gets, and a Hebrew reader ends up with less
 * information than an English one.
 *
 * This is a defect in our own code, so it always fails and has no escape hatch.
 * It is deliberately NOT the check for "has NX published something new" — that
 * one is about a third party's editorial decisions, cannot make the built site
 * wrong, and belongs in the advisory job in `.github/actions/nx-status`.
 *
 * Runs offline against committed files.
 *
 *   bun run verify:translations
 */

import { nx } from '../src/content/nx'

const LANGUAGES = [
  { name: 'English', path: 'src/content/en.ts' },
  { name: 'Hebrew', path: 'src/content/he.ts' },
] as const

const sources = await Promise.all(
  LANGUAGES.map(async (lang) => ({ ...lang, text: await Bun.file(lang.path).text() })),
)

// Presence per file, not per use site: this catches a figure wired into one
// language and entirely forgotten in the other, which is how the drift actually
// happens. It will not notice a figure used twice in English and once in
// Hebrew — detecting that needs to understand the content tree, not the text.
const asymmetric: string[] = []
for (const key of Object.keys(nx)) {
  const used = sources.filter((s) => s.text.includes(`nx.${key}`))
  if (used.length > 0 && used.length < sources.length) {
    const missing = sources.filter((s) => !used.includes(s)).map((s) => `${s.name} (${s.path})`)
    asymmetric.push(
      `nx.${key} — used in ${used.map((s) => s.name).join(', ')}, missing from ${missing.join(', ')}`,
    )
  }
}

if (asymmetric.length === 0) {
  console.log('Translations verified — every NX Group figure is carried in both languages.')
  process.exit(0)
}

console.error(
  `\n${'='.repeat(72)}\n` +
    `FAILED — ${asymmetric.length} NX figure(s) appear in one language but not the other\n` +
    `${'='.repeat(72)}\n`,
)
for (const line of asymmetric) console.error(`    ${line}`)
console.error(
  `\n  How to fix:\n\n` +
    `    Add the figure to the language file that is missing it, with a label\n` +
    `    written in that language. Every number taken from NX must appear in\n` +
    `    both, or visitors reading one language get less information than the\n` +
    `    other.\n`,
)

if (process.env.GITHUB_ACTIONS) {
  // %0A is how Actions encodes a newline inside an annotation.
  console.log(`::error::Untranslated NX figures%0A${asymmetric.join('%0A')}`)
}

process.exit(1)
