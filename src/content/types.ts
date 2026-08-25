/**
 * The shape every language file must satisfy.
 *
 * `en.ts` and `he.ts` are both declared `const content: SiteContent`, so a
 * missing or misspelled key in either language is a compile error. This is the
 * mechanism that guarantees every piece of information carried over from the
 * old site exists in both languages.
 *
 * Rule of thumb when extending: add the key here first, then to both language
 * files. Never widen a field to optional just to unblock a translation gap —
 * the gap is the thing the type system is meant to surface.
 */

export type Lang = 'en' | 'he'

/** A link that leaves the site. Rendered with an explicit external affordance. */
export interface ExternalLink {
  label: string
  href: string
}

/** A labelled figure used in the credibility strips. `value` is set in tabular numerals. */
export interface Figure {
  value: string
  label: string
}

/**
 * A photograph carried over from the old site.
 *
 * Only the words live here — the filename is an asset, not copy, so it is
 * mapped in the component. These are content images rather than decoration,
 * so `alt` is required and must describe the photograph, not name it.
 */
export interface PhotoMeta {
  alt: string
  /** Short line set under the plate, in the utility face. Omitted where a nearby heading already names the photo. */
  caption?: string
}

export interface NavItem {
  label: string
  to: string
}

export interface Location {
  /** Node id, shared with the corridor map so hero and contact page stay in sync. */
  id: 'hq' | 'ramla' | 'tlv' | 'ashdod' | 'haifa'
  name: string
  /** Address lines, already ordered for display. */
  address: string[]
  email?: string
  /** Label/number pairs: Tel, Fax, Mobile, and the two TLV desks. */
  phones: { label: string; value: string }[]
}

/** A heading + paragraphs block. The workhorse of every content page. */
export interface Prose {
  heading: string
  paragraphs: string[]
}

export interface PageMeta {
  /** <title> and <h1>. */
  title: string
  /** Meta description and, where shown, the page lede. */
  description: string
}

export interface SiteContent {
  meta: {
    /** Company legal name, used in the footer and structured data. */
    companyName: string
    tagline: string
    /** Label of the *other* language, shown on the switch. */
    otherLangLabel: string
    switchToOtherLang: string
  }

  nav: {
    primary: NavItem[]
    /** Footer's secondary text nav — mirrors the old site's footer link row. */
    footer: NavItem[]
    skipToContent: string
    menu: string
    close: string
  }

  footer: {
    copyright: string
    accessibility: string
    nipponBadgeAlt: string
    social: { facebook: string; linkedin: string; pinterest: string }
    socialHeading: string
  }

  common: {
    /** Suffix announced on links that leave the site. */
    externalLink: string
    opensExternalSystem: string
    readMore: string
    backToTop: string
    /** Screen-reader heading for the corridor map. */
    networkMapLabel: string
    networkMapDescription: string
    /**
     * Accessible name suffix for a map node on the Contact page, where each
     * node links down to that site's card.
     */
    jumpToLocation: string
    phone: string
    fax: string
    mobile: string
    email: string
    address: string
  }

  home: {
    meta: PageMeta
    hero: {
      /** Small mode tag above the display heading. */
      eyebrow: string
      heading: string
      /** The two intro paragraphs from the old home page, verbatim in substance. */
      lede: string[]
      primaryCta: NavItem
      secondaryCta: NavItem
      /**
       * Quote-request form. The Hebrew site carried a Google Form for this on
       * its home page and the English site did not, so English points at the
       * HubSpot form it already uses for contact — the nearest real equivalent.
       */
      quoteCta: ExternalLink
    }
    /** The five real network nodes rendered by the corridor map. */
    networkNodes: { id: Location['id']; name: string; role: string }[]
    figures: Figure[]
    /**
     * The three service pillars the old home page linked as image tiles. The
     * photographs are those same tiles, returned to the pillars they belonged
     * to — captionless, because the card's own title already names them.
     */
    pillars: { title: string; blurb: string; to: string; imageAlt: string }[]
    certificationsTeaser: { heading: string; blurb: string; cta: NavItem }
    trackingTeaser: { heading: string; blurb: string; cta: NavItem }
    nipponTeaser: { heading: string; blurb: string; cta: NavItem }
  }

  about: {
    meta: PageMeta
    profile: Prose
    /** The four sub-headed sections of the company profile. */
    sections: Prose[]
    certifications: {
      heading: string
      blurb: string
      items: ExternalLink[]
    }
    environment: Prose
  }

  scm: {
    meta: PageMeta
    photo: PhotoMeta
    intro: Prose
    /** "Synchronizing Global Operations" — the SCM landing bullets. */
    synchronizing: { heading: string; items: { title: string; body: string }[] }
    onSite: Prose
    whyOnSite: { heading: string; items: string[] }
    consulting: Prose
    framework: { heading: string; items: string[] }
  }

  globalTrade: {
    meta: PageMeta
    photo: PhotoMeta
    intro: Prose
    philosophy: Prose
    insurance: Prose
    /** Cards linking to the four freight-mode pages. */
    modes: { title: string; blurb: string; to: string }[]
    ocean: { meta: PageMeta; body: Prose }
    air: { meta: PageMeta; body: Prose; timeCritical: Prose }
    dropShipments: { meta: PageMeta; body: Prose }
    charter: { meta: PageMeta; body: Prose }
  }

  logistics: {
    meta: PageMeta
    photo: PhotoMeta
    intro: Prose
    center: Prose
    services: { heading: string; blurb: string; items: string[] }
    closing: Prose
    exhibitions: Prose
    exhibitionsProcess: { heading: string; items: string[] }
    exhibitionsClosing: string
  }

  tracking: {
    meta: PageMeta
    body: Prose
    parameters: { heading: string; items: string[] }
    cta: ExternalLink
    ctaNote: string
  }

  nippon: {
    meta: PageMeta
    /** Kept in full colour — the livery is content, not texture. */
    photo: PhotoMeta
    body: Prose
    figures: Figure[]
    history: Prose
    warehousing: Prose
    /** The service lines NX Group organises its offering into — added when the group rebranded. */
    services: { heading: string; items: { title: string; body: string }[] }
    links: ExternalLink[]
  }

  contact: {
    meta: PageMeta
    intro: string
    locations: Location[]
    form: { heading: string; blurb: string; cta: ExternalLink }
  }

  accessibility: {
    meta: PageMeta
    /** Rewritten for the new site — describes what this build actually does. */
    commitment: Prose
    features: { heading: string; items: string[] }
    /** Documented from the old site's Negishim widget, kept as historical record. */
    browserTips: { heading: string; blurb: string; items: string[] }
    feedback: Prose
  }

  notFound: {
    meta: PageMeta
    body: string
    cta: NavItem
  }
}
