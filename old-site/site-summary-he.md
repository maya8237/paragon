# Paragon Logistics — Website Summary (Hebrew)

Source: https://www.paragon-logistics.co.il/index.asp?siteLang=3 (Hebrew version, `siteLang=3`)

**Encoding found:** the server serves `charset=utf-8` and the bytes are genuine UTF-8. No
transcoding from windows-1255 was needed; the saved files read back as real Hebrew characters.

**Pages captured:** 22 (21 numeric content IDs discovered by crawling the primary nav and every
left sub-menu until the link set closed, plus the `index.asp` home page and the named
`PR-HEB-Paragon.html`). All returned HTTP 200. Raw HTML is in
[assets/raw_html_he/](assets/raw_html_he/), named to match the English counterpart file in
[assets/raw_html/](assets/raw_html/) wherever one exists.

**Important:** the Hebrew site is *not* a translation of the English site. It is separately
written copy that covers the same business, often reorganised, sometimes longer, sometimes
shorter, and with three sections that exist only in Hebrew. Differences are recorded under
**Gaps and divergences** below rather than smoothed over.

---

## ID → section → English counterpart

| Hebrew URL | Hebrew page title | English counterpart file | Section |
|---|---|---|---|
| `/index.asp?siteLang=3` | פראגון לוגיסטיקה | `index.html` | Home |
| `/64034.html` | פרופיל חברה | `about1.html` | About · nav target |
| `/64035.html` | פרופיל חברה | `about2.html` | About · Company Profile |
| `/89838.html` | איכות | *(none)* | About · Quality — **Hebrew only** |
| `/89982.html` | הסמכה כגורם כלכלי מאושר | *(none)* | About · AEO certification — **Hebrew only** |
| `/64037.html` | אחריות סביבתית | `p63208.html` | About · Environmental Awareness |
| `/PR-HEB-Paragon.html` | פרסומים וכתבות | *(none)* | About · Publications — **Hebrew only** |
| `/64038.html` | שרשרת אספקה גלובלית | `scm1.html` | SCM · landing |
| `/64039.html` | שירות באתר הלקוח | `scm2.html` | SCM · On Site Services |
| `/64040.html` | ייעוץ לוגיסטי | `p63211.html` | SCM · Consulting Services |
| `/64041.html` | סחר בינלאומי | `globaltrade.html` | Global Trade · landing |
| `/64042.html` | הובלה אוירית | `p63214.html` | Global Trade · Air Freight |
| `/64043.html` | הובלה ימית | `p63213.html` | Global Trade · Ocean Freight |
| `/64044.html` | משלוחי צד ג' (DROP) | `p63216.html` | Global Trade · Drop Shipments |
| `/64045.html` | טיסות/אניות שכר (צ'ארטר) | `p63217.html` | Global Trade · Charter Solutions |
| `/64051.html` | עמילות מכס | *(none)* | Global Trade · Customs Brokerage — **Hebrew only** |
| `/64046.html` | ניהול מלאי והפצה | `logistics1.html` | Logistics · nav target |
| `/64047.html` | ניהול מלאי והפצה | `logistics2.html` | Logistics · Material Management & Distribution |
| `/64048.html` | פרוייקטים מיוחדים ותערוכות | `p63221.html` | Logistics · Exhibitions & Special Projects |
| `/64049.html` | מעקב משלוחים | `tracking.html` | Tracking |
| `/74646.html` | ניפון אקספרס | `nippon.html` | Nippon Express |
| `/64050.html` | צרו קשר | `contact.html` | Contact |
| `/91453.html` | הצהרת נגישות | `accessibility.html` | Accessibility statement |

Saved filenames for the Hebrew-only pages: `p89838-quality.html`, `p89982-aeo.html`,
`p64051-customs.html`, `pr-heb.html`.

---

## Verbatim Hebrew strings

### Primary nav (8 items)

```
דף הבית · אודות · שרשרת אספקה · סחר בינלאומי · לוגיסטיקה · מעקב משלוחים · ניפון אקספרס · צרו קשר
```

Note the Hebrew labels are shorter than the English ones: "שרשרת אספקה" (not "שרשרת אספקה
גלובלית") for SCM, and plain "לוגיסטיקה" for Logistics Services.

### Sub-menus

- **אודות**: פרופיל חברה · איכות · הסמכה כגורם כלכלי מאושר · אחריות סביבתית · פרסומים
- **שרשרת אספקה**: שירות באתר הלקוח · ייעוץ לוגיסטי
- **סחר בינלאומי**: הובלה אוירית · הובלה ימית · משלוחי צד ג' (DROP) · טיסות/אניות שכר (צ'ארטר) · עמילות מכס
- **לוגיסטיקה**: ניהול מלאי והפצה · פרוייקטים מיוחדים ותערוכות

Two sub-menu entries have no English equivalent at all: **איכות**, **הסמכה כגורם כלכלי מאושר**
and **פרסומים** under About, and **עמילות מכס** under Global Trade.

### Home page headings

```
פראגון לוגיסטיקה
מחפשים פתרונות לשילוח בינלאומי? עמילות מכס? אחסנה לוגיסטית? הגעתם למקום הנכון!
נעים מאוד! אנחנו פראגון לוגיסטיקה.
```

Home tiles: שרשרת אספקה גלובלית · סחר בינלאומי · שירותי לוגיסטיקה

### Page headings (`h1.pageTitle`), in nav order

```
פרופיל חברה · איכות · הסמכה כגורם כלכלי מאושר · אחריות סביבתית · פרסומים וכתבות
שרשרת אספקה גלובלית · שירות באתר הלקוח · ייעוץ לוגיסטי
סחר בינלאומי · הובלה אוירית · הובלה ימית · משלוחי צד ג' (DROP) · טיסות/אניות שכר (צ'ארטר) · עמילות מכס
ניהול מלאי והפצה · פרוייקטים מיוחדים ותערוכות
מעקב משלוחים · ניפון אקספרס · צרו קשר · הצהרת נגישות
```

### Certification list labels (About → פרופיל חברה)

All five point at the **same Google Drive file IDs as the English side**:

```
הסמכה כגורם כלכלי מאושר - עמילות מכס ומשלח בנ"ל   → 1askTt-1V4HjjNGdTX-tziW6CUXyM17hQ
הסמכה כגורם כלכלי מאושר - מחסן                      → 1Qi_ecQnHWTEWQMvKK2FPqEC4I5HpezfR
הסמכה לת"י ISO9001                                  → 1pIC_9BHjrl9Nxrn4B5Wye60tiYxN6Aqg
הסמכה לת"י ISO9001 - English Version                → 1bg6lKc9TE1Fa4br53aG11YFavHDzL4PU
הסמכה מ- IQNET                                      → 14HahR8b7S6l5yK_3G9CwEfLiRSYWQNFf
```

Two Hebrew group headings sit above them: `הסמכה כגורם כלכלי מאושר AEO - על ידי מינהל המכס`
and `הסמכה לת"י ISO9001`.

### The five contact blocks (verbatim)

```
פראגון לוגיסטיקה - משרדים ראשיים
רחוב ההגנה 10, אור יהודה 6022410
אימייל: info@paragon-logistics.co.il
טלפון נייד לתגובה מהירה (ארנסט) 054-459-8000
טל' 03-9730460
פקס: 03-7586475
טופס יצירת קשר - לחצו כאן

פראגון לוגיסטיקה - המרכז הלוגיסטי
רח' בעלי המלאכה 7, רמלה 72558
טלפון נייד לתגובה מהירה (אלי) 054-535-2077
טל. 08-9158663

פראגון לוגיסטיקה - נציגות אוויר בנתב"ג
בניין סוויספורט, נמל תעופה בן גוריון (TLV), דרך חטיבה 8, נתב"ג
שירותי שילוח אוויר, טל. 03-5369012
שירותי עמילות מכס, טל. 03-5368853

פראגון לוגיסטיקה - נציגות ים באשדוד
דרך לסקוב 4, עורף הנמל אשדוד, אשדוד 7749204
טל. 08-6717786
פקס. 08-6729326

פראגון לוגיסטיקה - נציגות ים בחיפה
נמל חיפה, חיפה
טל' 03-9730460
```

The email address is obfuscated by Cloudflare in the raw HTML
(`<span class="__cf_email__">`); decoding the `data-cfemail` payload yields
`info@paragon-logistics.co.il`, the same address the English page uses.

### Footer

```
© all rights reserved Paragon Logistics
אודותינו | שרשרת אספקה גלובלית | סחר בינלאומי | שירותי לוגיסטיקה | מעקב משלוחים | צרו קשר
הצהרת נגישות
בניה שטיבל.קום
```

The copyright line is **left in English on the Hebrew site**. The footer nav has six links plus
the accessibility statement — same shape as the English footer.

### Tracking call to action

```
לכניסה למערכת לחצו כאן >>>   → http://192.115.200.209/UnifreightWeb/
```

---

## Page-by-page (Hebrew)

### דף הבית
Hero name פראגון לוגיסטיקה, a question-form hook (`מחפשים פתרונות לשילוח בינלאומי? עמילות מכס?
אחסנה לוגיסטית? הגעתם למקום הנכון!`), a greeting line, and two paragraphs describing the company
as דינמית ועתירת נסיון covering לוגיסטיקה, שרשרת האספקה and שילוח בינלאומי. Lists the service
basket: שילוח בינלאומי ועמילות מכס, אחסנה וניהול מלאי, הובלה והפצה, תערוכות ופרוייקטים מיוחדים,
ייעוץ. Closes with the Nippon agency line. Three tiles to the pillar pages.

### פרופיל חברה
Company profile with four sub-headings: מרכז מצוינות וקשר אישי · מרכז לוגיסטי המאפשר לארגון שלכם
לצמוח · ייעוץ מקיף לייעול שרשרת האספקה · פריסה עולמית – התשתית שלכם לקידום עסקי · הלקוח כשותף
אסטרטגי. Names the three activity centres (מרכז לוגיסטי, שילוח בינלאומי, תפעול ושירותי ייעוץ).
Ends with a "קישורים לכלים נוספים" block and the certifications list.

### איכות *(Hebrew only)*
Quality-management statement plus a numbered list of eight downloadable certificates covering AEO
(customs agent, logistics warehouse, official approval letter, English document) and ISO9001
(Israeli Standards Institute certificate, English certificate, IQNET certificate, combined
EN+HE file), and a link to an explanatory page about the ISO9001 certification process (Oct 2018).

### הסמכה כגורם כלכלי מאושר *(Hebrew only)*
Long-form announcement that Paragon passed the Israeli Customs Administration's AEO process,
valid from September 2018. Explains what AEO is, the financial/regulatory/security parameters
assessed, an eight-point list of programme goals, a four-point list of the concessions Paragon
receives, a summary, and four "מידע נוסף" links (two certificates, the official approval letter,
and the Ministry of Finance AEO programme page).

### אחריות סביבתית
Four short paragraphs, matching the English environmental statement point for point:
sustainable supply chain, preferring low-emission carriers, reuse and recycling on premises,
"שכנות טובה" policy.

### פרסומים וכתבות *(Hebrew only)*
Press and publications page.

### שרשרת אספקה גלובלית
Heading תאום ותיזמון פעילויות חובקות עולם with three sub-headed blocks: פתרונות מקיפים בשלביה
השונים של שרשרת האספקה · יעילות ואיכות בתהליכי העבודה · בדיוק מה שאתם צריכים - בתזמון הנכון.
Structurally the same three-point pitch as the English SCM landing, but the Hebrew gives each
point a real heading where the English uses a bare bullet.

### שירות באתר הלקוח
On-site services. Opens מעמידים לרשותכם עולם של ידע ומקצוענות, then four paragraphs, then
**שלוש סיבות טובות להעדיף את שירותי "אתר לקוח" - ON SITE של פראגון** with three bullets.

### ייעוץ לוגיסטי
Consulting. Opens המפתח להצלחת פעילות שרשרת האספקה, four paragraphs, then a five-item key-points
list (analysis of goals/markets, work plan for present and future needs, resource scan, matching
resources to needs, building supply-chain infrastructure).

### סחר בינלאומי
Global trade landing: forwarding as an integral part of the customer's commercial development,
global/geographic/operational/commercial/political considerations, long-term agreements with
agents and carriers. Then a **ביטוח** section on arranging cargo/in-transit/storage cover from
leading insurers.

### הובלה אוירית
Air freight: first-class carrier relationships, competitive pricing to central and remote
destinations, route negotiation per segment, customs clearance at departure and destination
ports, 24/7 computerised tracking. Ends with **משלוחים בדחיפות גבוהה** — time-critical shipments
with an assigned team member who verifies handling, updates the customer, and watches for delays.

### הובלה ימית
Ocean freight: global agent network handling FCL, LCL and consolidations, door-to-door multimodal
service, up-to-date rates for regular-line customers driven by supply and demand, and 24/7
computerised tracking.

### משלוחי צד ג' (DROP)
Drop shipments: global sourcing trends, goods moving destination-to-destination without passing
through the buyer's country, the logistical preparation and per-country import/export law
knowledge required, careful documentation, discretion and precision.

### טיסות/אניות שכר (צ'ארטר)
Charter: dedicated solutions for complex and irregular shipments by cargo nature, size or
destination; charter aircraft and cargo vessels of various sizes from independent operators.

### עמילות מכס *(Hebrew only)*
Customs brokerage, presented as one of Israel's leading such departments. Two sub-sections:
**סיווג מכס** (tariff classification, finding applicable reliefs, representation before customs
authorities) and **מסמכים ואישורים** (import documents, permits, inspection approvals, working
with the Ministry of Defence, government ministries, standards institutes and inspection
companies). Closes with a contact call to action.

### ניהול מלאי והפצה
Opens הניסיון שלנו - הרווח שלכם. Describes the logistics site as accessible to all air and sea
ports, professionally staffed across intake, storage, handling and packing, supported by
dedicated real-time software. Then a 13-item service list:
קליטה / ניפוק · אחסון · ניהול ואיסוף הזמנות · Cross docking · JIT Manufacturing Support ·
מערכות בקרת מלאי · אספקה וניהול מלאי חלפים · ניהול מלאי מקוון · ספירות מלאי · ליקוט ואיסוף ·
פעילות ערך מוסף · בקרת מספרים סידוריים · בניית קיטים, אריזה, סימון וכד'

### פרוייקטים מיוחדים ותערוכות
Exhibitions. Opens מומחיות לוגיסטית התומכת במאמצי השיווק שלכם. Substantially longer than the
English page: five paragraphs on why exhibition freight differs from routine business freight
(non-homogeneous consignments, the stand itself, demo equipment, marketing material, repacking
and splitting after the show, irregular shapes, last-minute items), then a three-item turnkey
list, then the closing line אתם קובעים את רמת המעורבות שלנו.

### מעקב משלוחים
Tracking pitch: full transparency, automatic status updates, secured by username and password to
the customer's own shipments only, traceable by transport type, carrier, destination and so on,
with shipping documents viewable. CTA לכניסה למערכת לחצו כאן to UnifreightWeb.

### ניפון אקספרס
Agency statement, 130+ years, 1,400 offices, 60,000 employees, 400M tons, "tailor made" services,
founded 1872 in Japan. Website and LinkedIn links. Carries a Hebrew Nippon network map image
(`Nippon-Map-650-hebrew2.jpg`) and the same Wikimedia cargo photo credit as the English page.

### צרו קשר
Five location blocks (verbatim above) plus the HubSpot web-form link and the three social icons.

### הצהרת נגישות
Same structure as the English statement: כללי · הפעלת ההנגשה (an eleven-item numbered list of the
Negishim widget's keyboard shortcuts) · הבהרה.

---

## Gaps and divergences

### Hebrew-only content with no English counterpart

1. **איכות** (`/89838.html`) — quality-management page with eight certificate downloads. The
   English side has only the five-item certification list inside the company profile.
2. **הסמכה כגורם כלכלי מאושר** (`/89982.html`) — a full page explaining the AEO programme and
   Paragon's September 2018 certification. Nothing equivalent in English.
3. **עמילות מכס** (`/64051.html`) — a dedicated customs-brokerage page under Global Trade. The
   English side mentions customs clearance only as a line inside other pages.
4. **פרסומים / פרסומים וכתבות** (`/PR-HEB-Paragon.html`) — press and publications.
5. Home page extras: the question hook `מחפשים פתרונות לשילוח בינלאומי?…`, the greeting
   `נעים מאוד!`, a **Google Forms quote-request link** (`https://forms.gle/1UJGFS68wG541c8y9`),
   and a blog link (`paragonlogistics.blogspot.co.il`). None appear on the English home page.
6. Company profile extras: a `קישורים לכלים נוספים` block linking the Facebook business page,
   the blog, Pinterest, a YouTube video, and a company presentation on Google Drive.

### English content with no Hebrew counterpart

1. **Nippon Express is materially thinner in Hebrew.** The Hebrew page omits the IATA
   "Number One Forwarder Worldwide" award, the ISO9002 certification, the 3,600,000 m² of
   warehouse property, the REWARDS (Remote Warehouse Distribution System) description, and the
   1960s international-expansion history. It keeps 1872, 130+ years, 1,400 offices, 60,000
   employees and 400M tons.
2. **"Why On-Site Services?" has five bullets in English, three in Hebrew.** The Hebrew list
   (`שלוש סיבות טובות`) covers experienced professionals, loyalty to the organisation, and full
   transparency; it drops "team players fully integrated" and "best SCM providers and agreements
   locally and abroad".
3. The English consulting framework has **six** steps; the Hebrew has **five** (it merges the
   English "build a well structured, cost-effective supply chain" into the infrastructure item).
4. The English logistics page states the **3,000 sqm** figure and the **80% of Israel's
   commercial and industrial activity** reach. The Hebrew page describes the same site but
   **states neither figure**.
5. The English ocean-freight page mentions **customs clearance at departure and destination
   ports** and long-term fixed-price agreements; the Hebrew ocean page mentions rate currency
   and 24/7 tracking instead, and does not mention customs clearance (the Hebrew *air* page does).
6. The English Global Trade landing has a distinct "conventional service, unconventional
   approach" passage naming markets, commodities, certifications and security constraints. The
   Hebrew landing has no equivalent passage.
7. The English company profile names **founder and CEO Marcelo Iellin**. The Hebrew profile
   does **not name the CEO** anywhere.

### Contact details that conflict between the two sites

These are factual conflicts, not translation differences. Each site is treated as authoritative
for its own language in the rebuild, and the discrepancy is recorded here.

| Detail | English site | Hebrew site |
|---|---|---|
| HQ mobile | *(not listed)* | 054-459-8000, named contact ארנסט |
| Ramla mobile | +972-54-5352077 | 054-535-2077, named contact אלי — same number |
| TLV customs broking tel | +972-3-7586469 | 03-5368853 — **different number** |
| TLV fax | +972-3-9730540 | *(not listed)* |
| Ashdod address | 4 Derech Laskov, Ashdod Port | דרך לסקוב 4, **עורף הנמל** אשדוד — adds "port rear" |
| Haifa tel | +972-3-7586470 | 03-9730460 — **different number** (matches HQ tel) |
| Haifa fax | +972-3-7586475 | *(not listed)* |

Note also that the Hebrew contact page labels the two mobile numbers
`טלפון נייד לתגובה מהירה` ("mobile for a fast response") with a named person, which the English
page does not do.

### Shared across both languages

The certification Google Drive file IDs, the UnifreightWeb tracking URL, the HubSpot form URL,
the Nippon Express website and LinkedIn URLs, and the Facebook / LinkedIn / Pinterest profile
URLs are identical on both sites. The copyright line is in English on both.
