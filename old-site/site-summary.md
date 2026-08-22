# Paragon Logistics — Website Summary

Source: https://www.paragon-logistics.co.il/ (English version, `siteLang=2`)

## Purpose

Corporate marketing/informational site for **Paragon Logistics Ltd.**, an Israeli logistics, freight-forwarding, and supply-chain-management company. It is not transactional (no e-commerce, no login-gated content on the main site) — it exists to:
- explain the company's service lines to prospective B2B customers
- establish credibility (certifications, Nippon Express partnership, veteran leadership)
- list contact points for its five physical locations
- hand off to an external system for shipment tracking

## Global Features (present on every page)

- **Header**: Paragon Logistics logo (links home) + small co-branded "Agent of Nippon Express" badge logo.
- **Primary nav** (8 items): Home, About, SCM, Global Trade, Logistics Services, Tracking, Nippon Express, Contact.
- **Language switch**: עברית / English (Hebrew version exists as a mirrored site under `siteLang=3`; not captured in this pass).
- **Search box** in header (site search).
- **Footer**: copyright line, secondary text-link nav duplicating the 6 main sections, "Accessibility statement" link, "Built by shteeble.com" (site's original web dev agency credit).
- **Accessibility widget** (third-party "Negishim" plugin): floating icon opening a panel with text-size steps, contrast modes, grayscale/monochrome mode, link-underline toggle, animation-blocking, dyslexia-friendly font toggle, and a reset button. A matching `/accessibility-statement` page documents keyboard shortcuts (Caps Lock to activate, Ctrl +/− to zoom, Ctrl+4–7 for contrast/flash/reset shortcuts).
- **Chat widget** (present in DOM, third-party).
- Social links in the homepage footer/body area: Facebook, LinkedIn, Pinterest icons.
- Site technically runs on an old ASP-based CMS (`index.asp`, numeric `.html` content IDs, jQuery 1.4-era scripts, table-based layout) — dated implementation but content/IA is clear.

## Page-by-Page Content

### 1. Home (`/`)
- Hero heading "Paragon Logistics" + two intro paragraphs describing the company's value proposition (comprehensive logistics/SCM/freight solutions, personal approach, consultation + warehousing + freight + customs clearance).
- Three clickable image tiles linking to the three service pillars: **Supply Chain Management**, **Global Trade**, **Logistics Services**.

### 2. About → Company Profile (`/63206.html`, nav target `/63205.html` redirects here)
Sub-nav: *Company profile* | *Environmental awareness*
- Long-form company profile: who Paragon is, personnel/personal attention (CEO **Marcelo Iellin**, founder), description of the 3,000 sqm logistic center in central Israel, "expanding your global reach," consulting/SCM cycle, closing pitch ("a hand in hand partnership").
- **Certifications** list, each linking out to a Google Drive–hosted PDF:
  - AEO Certification – Customs Broker and International Shipping
  - AEO Certification – Warehouse
  - ISO9001 – English Certification
  - ISO9001 – Hebrew Certification
  - IQNET Certification

### 2b. About → Environmental Awareness (`/63208.html`)
- Short statement on sustainable supply chain practices: choosing lower-emission suppliers/carriers, reuse/recycling on premises, "good neighbor" community/environmental policy.

### 3. SCM → On Site Services (`/63209.html`, nav target "SCM")
Sub-nav: *On Site Services* | *Consulting Services*
- Pitch for embedding Paragon's trained personnel on-site at a customer's operation (import/export, forwarding, customs). Bullet list "Why On-Site Services?" (experience, dedication to client goals, transparency, team integration, best local/abroad SCM partners).

### 3b. SCM → Consulting Services (`/63211.html`)
- Consulting methodology: analyze org needs/resources, identify weak links, help build supply-chain infrastructure. Bulleted 6-step framework (analyze goals → blueprint needs → scan resources → tailor resources → build cost-effective SC → create SC infrastructure).

### 4. Global Trade (`/63212.html`)
Sub-nav: *Ocean Freight* | *Air Freight* | *Drop Shipments* | *Charter Solutions*
- Overview of global trade philosophy (route/schedule/budget optimization, long-term agreements, tailored project solutions) plus an **Insurance** section on cargo/transit/storage coverage via partner insurers.

### 4a. Global Trade → Ocean Freight (`/63213.html`)
- FCL/LCL/consolidation shipping via partner ocean carriers, flexible door-to-door multimodal solutions, customs clearance at origin/destination included.

### 4b. Global Trade → Air Freight (`/63214.html`)
- Full airfreight scope, preferential carrier agreements, 24/7 shipment tracing via IT systems, customized pricing by cargo/urgency/destination, customs clearance included, and a **Time Critical Shipments** callout for urgent/sensitive cargo.

### 4c. Global Trade → Drop Shipments (`/63216.html`)
- Coordination of complex multi-origin drop shipments for globally-sourced manufacturing/markets; documentation and customs-regulation expertise via a forwarding-specialist network.

### 4d. Global Trade → Charter Solutions (`/63217.html`)
- Tailored charter shipments with independent operators for irregular cargo/hard-to-reach destinations where standard freight is too costly or infrequent.

### 5. Logistics Services → Material Management & Distribution (`/63220.html`, nav target `/63219.html` redirects here)
Sub-nav: *Material Management & Distribution* | *Exhibitions & Special Projects*
- Describes the 3,000 sqm logistic center (strategic access to air/sea ports, reaches 80% of Israel's commercial/industrial activity). Bullet list of 13 services: Inbound/Outbound, Storage, Order Fulfillment, Cross Docking, JIT Manufacturing Support, Inventory Control Systems, Service Parts Logistics, Online Inventory Management, Cycle Counts, Pick & Pack, Customer-Tailored Activity, Serial-Number Control, Value-Added Activities (kitting/packing/labeling).

### 5b. Logistics Services → Exhibitions & Special Projects (`/63221.html`)
- Positions Paragon as a specialist in exhibition/special-project logistics (multi-modal, irregular packaging, demo-equipment permits, tight timing). Describes turnkey process: annual logistics budgeting, pre-organized bill-of-materials/schedule, liaison with exhibition officials on documentation/customs, dedicated 24/7 contact.

### 6. Tracking (`/63223.html`)
- Short pitch for transparent, automatically-updated shipment tracking (by transport mode, carrier, destination, location; documents viewable in-system).
- **"Click here to enter the site"** → external link to a third-party tracking system (`UnifreightWeb`, plain-HTTP IP-hosted, username/password protected). Not part of this site's own codebase — a hand-off to an external SaaS.

### 7. Nippon Express (`/Nippon.html`)
- Explains Paragon is the Israeli agent for **Nippon Express**: founded 1872 in Japan, 130+ years experience, 1,400 offices worldwide, 60,000 employees, 400M+ tons freight handled/yr, "Number One Forwarder Worldwide" (IATA), ISO9002, 3.6M m² of global warehouse space, proprietary "REWARDS" (Remote Warehouse Distribution System). Links to nipponexpress.com and their LinkedIn.
- Includes a stock cargo-ship photo credited "Photo by Pieter van Marion from Netherlands, CC-BY-SA-2.0, via Wikimedia Commons" — attribution is worth preserving if the image is reused.

### 8. Contact (`/63224.html`)
- Five physical locations, each with address/phone/fax as applicable:
  1. **Headquarters** — 10 Ha-Hagana St., Or Yehuda 6022410, Israel. Email `info@paragon-logistics.co.il`, Tel +972-3-9730460, Fax +972-3-7586475.
  2. **Logistics Center** — 7 Ba'alei ha-Melakha St., Ramla 72558. Tel +972-8-9158663, Mobile +972-54-5352077.
  3. **Air Branch — Ben Gurion Airport (TLV)** — Swissport building, Derekh Khativa 8. Air Freight Tel +972-3-5369012; Customs Broking Tel +972-3-7586469, Fax +972-3-9730540.
  4. **Ocean Branch — Ashdod Port** — 4 Derech Laskov, Ashdod 7749204. Tel +972-8-6717786, Fax +972-8-6729326.
  5. **Ocean Rep. — Haifa Port** — Tel +972-3-7586470, Fax +972-3-7586475.
- **"Click here to contact us by a web form"** → embedded/linked HubSpot form (`share.hsforms.com`), i.e. lead-capture form is outsourced to HubSpot rather than a native form.

### 9. Accessibility Statement (`/91454.html`)
- Standard accessibility-commitment statement plus documentation of the keyboard shortcuts exposed by the Negishim accessibility widget (Caps Lock to open, Ctrl + `+`/`-` to zoom 25%/50% steps, Esc to close, Space to scroll, Ctrl+7 stop animations, Ctrl+6 high contrast, Ctrl+5 black/yellow mode, Ctrl+4 reset). Invites users to report accessibility issues.

## Logos & Key Images Captured

| Asset | Description | Native size |
|---|---|---|
| `paragon_logistics_logo.png` | Primary Paragon Logistics logo | 435×136 |
| `Small-Logo_with_Nippon_to_web_site.jpg` | Co-branded "Paragon + Nippon Express agent" badge | 212×32 |
| `home_image_Global_supply_Chain.jpg` | Home tile — SCM | 184×115 |
| `home_image_Global_Trade.jpg` | Home tile — Global Trade | 184×115 |
| `home_image_Logistics_Services.jpg` | Home tile — Logistics Services | 184×115 |
| `home_banner.png` | Decorative home banner graphic | 260×145 |
| `facebook-paragon.jpg` / `linkedin-paragon.jpg` / `pintrest-for-paragon.jpg` | Social icons | 42×42 each |
| `nippon-cargo.jpg` | Cargo-ship photo on the Nippon Express page (Wikimedia, CC-BY-SA-2.0, credit: Pieter van Marion) | 500×333 |
| various background/decorative images (`page_bg`, `header_inner_bg`, `footer_bg`, `left_menu_bg`, etc.) | Old-CMS table-layout background art, low value for a rebuild but archived | — |

All of the above were already downloaded into `assets/images/` and the live stylesheet into `assets/css/site.css` during exploration, so they're ready to reference whenever the rebuild resumes.

## Site Map (all English-language content URLs discovered)

```
/                      Home
/63205.html            → redirects to /63206.html (About nav target)
/63206.html            About · Company Profile
/63208.html            About · Environmental Awareness
/63209.html            SCM · On Site Services
/63210.html            (footer alt link to SCM landing — same section)
/63211.html            SCM · Consulting Services
/63212.html            Global Trade (landing)
/63213.html            Global Trade · Ocean Freight
/63214.html            Global Trade · Air Freight
/63216.html            Global Trade · Drop Shipments
/63217.html            Global Trade · Charter Solutions
/63219.html            → redirects to /63220.html (Logistics nav target)
/63220.html            Logistics Services · Material Management & Distribution
/63221.html            Logistics Services · Exhibitions & Special Projects
/63223.html            Tracking (hands off to external UnifreightWeb system)
/63224.html            Contact
/Nippon.html           Nippon Express (partner page)
/91454.html            Accessibility statement
```

## Notable Implementation Details Worth Preserving in a Rebuild

- **Brand palette** (pulled from live CSS): nav link `#005494`, nav hover `#70be45`, secondary-nav background `#1c3764`, secondary-nav hover text `#d3b975`, primary blue `#2f83c6`, body copy `#003a67`/`#003258`.
- Tracking and the contact web-form are both outsourced to third parties (UnifreightWeb, HubSpot) rather than built natively — a rebuild should decide whether to keep those integrations or replace them.
