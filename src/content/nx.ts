import data from './nx-figures.json'

/**
 * NX Group's published headline numbers, as scraped from their About page.
 *
 * `nx-figures.json` is generated — see `scripts/fetch-nx-figures.ts` and the
 * scheduled workflow that opens a pull request when the numbers move. Import
 * from here rather than reaching into the JSON, so the language files stay
 * unaware of the file's shape and there is one place to adjust if it changes.
 *
 * Only numbers live here. Everything said *about* them is hand-written per
 * language in `en.ts` / `he.ts`, because the Hebrew copy is separately authored
 * and nothing upstream can translate it.
 */
export const nx = {
  /** Year Nippon Express Co., Ltd. was established. Distinct from the 1872 origins of its predecessor. */
  founded: data.figures.founded.value,
  /** Position on Armstrong & Associates' Top 25 Global Freight Forwarders list, as a bare numeral. */
  worldRank: data.figures.worldRank.value,
  countries: data.figures.countries.value,
  locations: data.figures.locations.value,
  groupCompanies: data.figures.groupCompanies.value,
  employees: data.figures.employees.value,
} as const
