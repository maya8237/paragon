import type { SiteContent } from './types'
import { nx } from './nx'

/**
 * English copy.
 *
 * Sourced from the archived site under `old-site/assets/raw_html/`. Body copy
 * is carried over close to verbatim — this is the client's own marketing
 * language and the rebuild is a re-presentation, not a rewrite. Only the
 * accessibility statement is deliberately rewritten, because the old one
 * described a third-party widget this build does not carry over.
 */
const content: SiteContent = {
  meta: {
    companyName: 'Paragon Logistics Ltd.',
    tagline: 'Logistics, supply chain management and freight operations',
    otherLangLabel: 'עברית',
    switchToOtherLang: 'Switch to Hebrew',
  },

  nav: {
    primary: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'SCM', to: '/scm' },
      { label: 'Global Trade', to: '/global-trade' },
      { label: 'Logistics Services', to: '/logistics' },
      { label: 'Tracking', to: '/tracking' },
      { label: 'Nippon Express', to: '/nippon' },
      { label: 'Contact', to: '/contact' },
    ],
    footer: [
      { label: 'About us', to: '/about' },
      { label: 'Global supply Chain', to: '/scm' },
      { label: 'Global Trade', to: '/global-trade' },
      { label: 'Logistics Services', to: '/logistics' },
      { label: 'Shipments Tracking', to: '/tracking' },
      { label: 'Contact us', to: '/contact' },
    ],
    skipToContent: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
  },

  footer: {
    copyright: '© All rights reserved - Paragon Logistics Ltd.',
    accessibility: 'Accessibility statement',
    social: {
      facebook: 'Paragon Logistics on Facebook',
      linkedin: 'Paragon Logistics on LinkedIn',
      pinterest: 'Paragon Logistics on Pinterest',
    },
    socialHeading: 'Follow Paragon',
  },

  common: {
    externalLink: 'opens in a new tab',
    opensExternalSystem: 'Opens an external system in a new tab',
    readMore: 'Read more',
    backToTop: 'Back to top',
    networkMapLabel: 'Paragon’s network in Israel',
    networkMapDescription:
      'Five sites connected by air, ocean and road corridors: headquarters in Or Yehuda, the logistics centre in Ramla, the air branch at Ben Gurion Airport, the ocean branch at Ashdod Port and the ocean representative at Haifa Port.',
    jumpToLocation: 'jump to contact details',
    phone: 'Tel',
    fax: 'Fax',
    mobile: 'Mobile',
    email: 'Email',
    address: 'Address',
  },

  home: {
    meta: {
      title: 'Paragon Logistics',
      description:
        'A dynamic provider of comprehensive logistics, supply chain management and freight operations solutions, with the knowledge and professionalism of industry experts.',
    },
    hero: {
      eyebrow: 'NETWORK',
      heading: 'Paragon Logistics',
      lede: [
        'Paragon is a dynamic provider of comprehensive logistics, supply chain management and freight operations solutions, with the knowledge and professionalism of industry experts.',
        'We offer a profound and personal approach to the complete supply chain cycle for any size business. Our diversified service offering includes unique logistic consultation services, material management and warehousing facilities, traditional and tailored freight operations and customs clearance.',
      ],
      primaryCta: { label: 'See our services', to: '/scm' },
      secondaryCta: { label: 'Contact us', to: '/contact' },
      quoteCta: {
        label: 'Request a shipping quote',
        href: 'https://share.hsforms.com/1tVjMQPy2RMSKL5KFIBwZTQ28zsu',
      },
    },
    networkNodes: [
      { id: 'hq', name: 'Or Yehuda', role: 'Headquarters' },
      { id: 'ramla', name: 'Ramla', role: 'Logistics centre · 3,000 m²' },
      { id: 'tlv', name: 'Ben Gurion', role: 'Air branch · TLV' },
      { id: 'ashdod', name: 'Ashdod', role: 'Ocean branch · port' },
      { id: 'haifa', name: 'Haifa', role: 'Ocean representative · port' },
    ],
    figures: [
      { value: '3,000 m²', label: 'Logistics centre in central Israel' },
      { value: '80%', label: 'of Israel’s commercial and industrial activity in reach' },
      { value: '5', label: 'sites: HQ, logistics centre, air branch, two ports' },
      { value: '24/7', label: 'tracing on airfreight operations' },
    ],
    pillars: [
      {
        title: 'Supply Chain Management',
        blurb:
          'On-site personnel embedded in your operation, and consulting across the complete SCM cycle — from analysing goals to building the infrastructure that supports them.',
        to: '/scm',
      },
      {
        title: 'Global Trade',
        blurb:
          'Ocean, air, drop shipments and charter solutions, with customs clearance at departure and destination and insurance cover from leading houses.',
        to: '/global-trade',
      },
      {
        title: 'Logistics Services',
        blurb:
          'A 3,000 m² logistics centre for material management and distribution, plus turnkey logistics for exhibitions and special projects.',
        to: '/logistics',
      },
    ],
    certificationsTeaser: {
      heading: 'Certified operations',
      blurb:
        'Authorised Economic Operator certification for both customs broking and warehousing, ISO9001 and IQNET.',
      cta: { label: 'View certifications', to: '/about#certifications' },
    },
    trackingTeaser: {
      heading: 'Be updated every step of the way',
      blurb:
        'Shipment status updates automatically, secured per customer, traceable by transport mode, carrier, destination and location.',
      cta: { label: 'About tracking', to: '/tracking' },
    },
    nipponTeaser: {
      heading: 'Agent of Nippon Express in Israel',
      blurb:
        'Founded 1872. 1,400 offices worldwide, 60,000 employees and over 400 million tons of total freight.',
      cta: { label: 'About the partnership', to: '/nippon' },
    },
  },

  about: {
    meta: {
      title: 'Company Profile',
      description:
        'Paragon Logistics Ltd. — industry veterans offering a profound and personal approach to the complete supply chain cycle, from a 3,000 m² logistics centre in central Israel.',
    },
    profile: {
      heading: 'Company Profile',
      paragraphs: [
        'Paragon Logistics Ltd. is a dynamic provider of comprehensive logistics, supply chain management and freight operations solutions, with the knowledge and professionalism of industry veterans.',
        'With years of experience in all aspects of the international trade and logistics market we offer a profound and personal approach to the complete supply chain cycle for any size business.',
        'Our diversified service offering includes unique logistic consultation services, material management and warehousing facilities, traditional and tailored freight operations and customs clearance.',
        'We offer our customers a center of excellence they can partner with and benefit from full transparency and a sincere commitment to mutual success.',
        'Our operations are grouped into three main activity centers — Logistic Center, Freight Operations and Consultation Services — that operate in full synergy to enhance your business through operational advantages and profit.',
      ],
    },
    sections: [
      {
        heading: 'Personnel & personal attention',
        paragraphs: [
          'Headed by founder and CEO Marcelo Iellin, our entire team of experts is attuned to your needs and accessible directly when needed.',
          'We maintain a lean structure organization of qualified personnel that can be hired in-house or assigned on an outsourcing service basis for all SCM activities, for any size business.',
          'The flexibility of our organization ensures that customers will find the right formula to contract the specific services they need without affecting other aspects of their operations.',
        ],
      },
      {
        heading: 'Our Logistic Center — an extension to your organization',
        paragraphs: [
          'Paragon’s unique comprehensive approach to logistics has initiated our 3,000 square meter warehousing facility and logistic center. Strategically located in the center of Israel and easily accessible to importers and exporters alike, this center functions as a material management hub for inbound and outbound goods complementing all the traditional freight operations which we provide as well.',
        ],
      },
      {
        heading: 'Expanding your global reach',
        paragraphs: [
          'Paragon, through its SCM consulting and freight operations, offers ways to enhance your international trade and expand your global network effectively.',
          'Leaders in freight operations, we provide the full array of global trade services, handling our customers’ business from source to destination offering the best solutions tailored to their needs.',
        ],
      },
      {
        heading: 'Consulting — the full SCM Cycle',
        paragraphs: [
          'The key to efficient supply chain management can be critical to a company’s operational profit. Paragon offers consultation services for the complete SCM cycle, adhering to thoroughly understanding the industry and company specific requirements then tailoring the required supply chain model to your needs.',
        ],
      },
      {
        heading: 'A hand in hand partnership',
        paragraphs: [
          'Accessibility, professionalism and unique added value services alongside traditional forwarding, customs clearance and logistics operations, plus the freedom to choose the most suitable contracting formula, position Paragon as the natural partner to take your business a step forward.',
        ],
      },
    ],
    certifications: {
      heading: 'Certifications',
      blurb:
        'Each certificate opens as a PDF hosted on Google Drive, in a new tab.',
      items: [
        {
          label:
            'Authorised Economic Operator (AEO) Certification — Customs Broker and International Shipping',
          href: 'https://drive.google.com/file/d/1askTt-1V4HjjNGdTX-tziW6CUXyM17hQ/view',
        },
        {
          label: 'Authorised Economic Operator (AEO) Certification — Warehouse',
          href: 'https://drive.google.com/file/d/1Qi_ecQnHWTEWQMvKK2FPqEC4I5HpezfR/view',
        },
        {
          label: 'ISO9001 — English Certification',
          href: 'https://drive.google.com/file/d/1bg6lKc9TE1Fa4br53aG11YFavHDzL4PU/view',
        },
        {
          label: 'ISO9001 — Hebrew Certification',
          href: 'https://drive.google.com/file/d/1pIC_9BHjrl9Nxrn4B5Wye60tiYxN6Aqg/view',
        },
        {
          label: 'IQNET Certification',
          href: 'https://drive.google.com/file/d/14HahR8b7S6l5yK_3G9CwEfLiRSYWQNFf/view',
        },
      ],
    },
    environment: {
      heading: 'Environmental Awareness',
      paragraphs: [
        'Paragon is committed to provide sustainable supply chain solutions and maintain our customers’ commitment to their environmental policies. To do so we consider environmental issues in every stage of our planning and operations.',
        'We make an effort to select and offer our customers suppliers and carriers that have made efforts and technological adaptation to reduce gas emissions and pollution and offer more sustainably-sourced alternatives.',
        'We focus on opportunities to practice reuse and recycling on our premises whenever possible.',
        'Paragon acts with respect to its surroundings implementing “good neighbor” policies respecting the environment and community.',
      ],
    },
  },

  scm: {
    meta: {
      title: 'Supply Chain Management',
      description:
        'On-site logistics personnel and full-cycle supply chain consulting — analysing needs and resources, identifying weak links, and building the infrastructure to support growth.',
    },
    intro: {
      heading: 'Supply Chain Management',
      paragraphs: [
        'Paragon offers the services of professionally trained personnel on site, and consulting across the complete supply chain cycle — two ways to bring the same expertise inside your operation.',
      ],
    },
    synchronizing: {
      heading: 'Synchronizing Global Operations',
      items: [
        {
          title: 'Comprehensive solutions at all levels of the supply chain',
          body: 'Coordinate and synchronize procurement deliveries with worldwide agencies while handling all processes involved, such as: import, pick-up and storage, raw materials management and delivery to the production line. Inventory and storage space management, preparation of export shipments and tracking through to delivery to destination.',
        },
        {
          title: 'The best solutions',
          body: 'Routine analysis of activities in an ongoing effort to achieve goals and efficiency while optimizing economic value.',
        },
        {
          title: 'Solutions tailored',
          body: 'To the customer’s needs, while maintaining flexibility to adapt to real-time changes in the field.',
        },
      ],
    },
    onSite: {
      heading: 'On Site Services',
      paragraphs: [
        'Everything we know without having to ask us.',
        'Paragon specializes in offering customers the services of professionally trained, multidisciplinary personnel to execute their import and export logistic services. The high quality of this unique service enables customers to have on-site personnel experienced in all aspects of shipping, forwarding and customs clearance.',
        'On-site employees are service providers that are an integral part of the organization, working transparently, making operational choices that are beneficial to the organization and in line with the company’s business policies.',
        'Paragon’s on-site personnel are team players that perform their duties as part of the logistic team and identify with the goals and mission assigned to them. They have no preferential agenda other than offering the best standard of services with the added value of Paragon’s professional advice and support to assist them if necessary.',
      ],
    },
    whyOnSite: {
      heading: 'Why On-Site Services?',
      items: [
        'Experienced, trained professionals in all areas of logistic operations',
        'Dedicated to the organization’s benefit, policies and goals',
        'Absolute transparency',
        'Team players fully integrated to achieve the organization’s goals',
        'The best SCM service providers and agreements locally and abroad',
      ],
    },
    consulting: {
      heading: 'Consulting Services',
      paragraphs: [
        'The key to successful SCM organization.',
        'Paragon offers a professional eye that sees the whole picture — analyzes the organizational needs, existing personnel and resources, identifies weak links and strengthens them, and generally helps integrate all functional aspects to create a sound foundation for present operations and future growth.',
        'We help assign supply chain personnel with diversified qualifications and tasks to work synergistically to achieve the corporate goals.',
        'Paragon analyzes the SCM organization for functions that may be dispersed, overlap or be overlooked; employees and resources that may be positioned or used ineffectively.',
        'Our services optimize the budget, functionality and results of the supply chain to build an infrastructure and implement processes that will contribute to the company’s business achievements.',
        'Small and large companies, whether at the on-set of activities or experienced players in their market, should assess their needs, resources and goals, and adjust the operational structure accordingly.',
      ],
    },
    framework: {
      heading: 'The key to building a healthy, stable and expandable supply chain',
      items: [
        'Analyze the goals, markets and activities that require SC services',
        'Blueprint the present and future needs',
        'Scan the present human and other resources in the company',
        'Tailor present resources to needs: train, re-position, define functions, recruit',
        'Build a well structured, smooth functioning, cost-effective supply chain',
        'Create supply chain infrastructure: quality suppliers, beneficial service agreements, structure main activity channels',
      ],
    },
  },

  globalTrade: {
    meta: {
      title: 'Global Trade',
      description:
        'Ocean freight, air freight, drop shipments and charter solutions, with customs clearance at departure and destination and professional insurance coverage.',
    },
    intro: {
      heading: 'Global Trade',
      paragraphs: [
        'Paragon sees the globe from all angles making it possible for us to offer the best solution from any perspective — geographic, operational, commercial and political.',
        'We gather all the relevant parameters and process them to provide the best route and means of transportation within the schedule and budget limits. We create beneficial long term agreements for our customers’ routine import and export business activities; tailor project specific solutions and keep exploring new possibilities in the dynamic world of forwarding services.',
      ],
    },
    philosophy: {
      heading: 'A conventional service with an unconventional approach',
      paragraphs: [
        'Paragon supplies conventional global trade services with a unique unconventional approach. We believe that the forwarding of goods is an integral part of our customers’ growth. It has to integrate with their markets, commodities, certifications, security constraints and any other aspect relevant to their business activities.',
        'Our airfreight, ocean freight, drop shipments and customs brokerage services are all parts of the puzzle we put together to forward our customers’ business.',
      ],
    },
    insurance: {
      heading: 'Insurance',
      paragraphs: [
        'We value your business and your cargo as well. To sign our global trade services we provide professional insurance coverage from leading insurance houses for all our shipments and logistic services, including in-transit and storage facilities.',
        'Professional insurance brokers give you the peace of mind that your cargo is fully insured and the policy will give you the best compensations should you need to file a claim.',
      ],
    },
    modes: [
      {
        title: 'Ocean Freight',
        blurb:
          'FCL, LCL and consolidations with leading international carriers, plus flexible door-to-door multimodal solutions.',
        to: '/global-trade/ocean',
      },
      {
        title: 'Air Freight',
        blurb:
          'The entire scope of airfreight, traced 24/7, priced to cargo type, urgency and destination — including time critical shipments.',
        to: '/global-trade/air',
      },
      {
        title: 'Drop Shipments',
        blurb:
          'Coordination of complex multi-origin drop shipments, with the documentation and customs expertise they demand.',
        to: '/global-trade/drop-shipments',
      },
      {
        title: 'Charter Solutions',
        blurb:
          'Tailored charter shipments with independent operators for irregular cargo and hard-to-reach destinations.',
        to: '/global-trade/charter',
      },
    ],
    ocean: {
      meta: {
        title: 'Ocean Freight',
        description:
          'FCL, LCL and consolidation shipping through leading international ocean carriers, with customs clearance at departure and destination ports.',
      },
      body: {
        heading: 'Ocean Freight',
        paragraphs: [
          'Paragon is pleased to offer its customers the benefits of our special contacts with leading international ocean carriers worldwide. We operate the full range of shipments — FCL, LCL, consolidations — providing the ideal solution for each and every shipment.',
          'Our service includes a variety of flexible door-to-door multimodal solutions we tailor to your specific need. We customize the details and scope of the solution you require for each shipment, or provide cost-effective long-term fixed price agreements for ongoing business transactions.',
          'Our ocean freight services include all customs clearance requirements at departure and destination ports.',
        ],
      },
    },
    air: {
      meta: {
        title: 'Air Freight',
        description:
          'The entire scope of airfreight services with preferential carrier agreements, 24/7 tracing, and time critical delivery for urgent or sensitive shipments.',
      },
      body: {
        heading: 'Air Freight',
        paragraphs: [
          'Paragon offers the entire scope of airfreight services shipping your cargo safely to any destination. Our customers benefit from preferential commercial agreements and first-class carriers operating our network to international centers as well as the remotest corners of the globe.',
          'All our airfreight operations can be traced 24/7 through advanced IT forwarding systems.',
          'We customize the service and tailor the price according to the type of cargo, level of urgency and destination. We negotiate your cargo’s route every step of the way to quote the best comprehensive offer for your consolidations and transshipments.',
          'Our air freight services include all customs clearance requirements at departure and destination ports.',
        ],
      },
      timeCritical: {
        heading: 'Time critical shipments',
        paragraphs: [
          'As part of our airfreight services portfolio we offer time critical delivery for sensitive or urgent shipments that cannot miss a deadline. These shipments receive special personal care and attention with an assigned agent following up on their operation and delivery.',
        ],
      },
    },
    dropShipments: {
      meta: {
        title: 'Drop Shipments',
        description:
          'Expert coordination of complex, sensitive drop shipments for globally sourced manufacturing and markets, including documentation and customs regulations.',
      },
      body: {
        heading: 'Drop Shipments',
        paragraphs: [
          'Global enterprises and businesses are increasingly sourcing materials worldwide, supplying them to dispersed manufacturing facilities or markets. These new business trends have increased the share of drop shipments in global trade.',
          'Paragon offers expert knowledge and solutions in coordinating complex and sensitive drop shipments, managing the operations and the documentation involved with special care and responsibility.',
          'Through a network of forwarding specialists we offer professional transport solutions and profound knowledge of the different customs regulations and documentation required for smooth delivery of complex shipments on time.',
        ],
      },
    },
    charter: {
      meta: {
        title: 'Charter Solutions',
        description:
          'Tailored charter shipments with independent operators, for irregular cargo and distant destinations where standard freight is too costly or too infrequent.',
      },
      body: {
        heading: 'Charter Solutions',
        paragraphs: [
          'Paragon offers unconventional solutions for irregular cargo requirements. Standard cost of air and ocean freight to distant, difficult to access destinations may prove very costly and may have to rely on irregular schedules.',
          'For such cases, and where economical and operational considerations are justified, we offer and operate — as part of our portfolio of services — tailored charter shipment with independent operators.',
        ],
      },
    },
  },

  logistics: {
    meta: {
      title: 'Logistics Services',
      description:
        'A 3,000 m² logistics centre for material management and distribution, plus turnkey logistics for exhibitions and special projects.',
    },
    intro: {
      heading: 'Material Management & Distribution',
      paragraphs: ['Profit from experience — save on resources.'],
    },
    center: {
      heading: 'The logistic center',
      paragraphs: [
        'Our 3,000 sqm logistic center is strategically located to access main air and sea ports and 80% of Israel’s commercial and industrial activity. Customers can use our facilities for storage and advanced inventory management, or benefit from well trained, expert teams to execute in- and outbound processes, packaging, general warehousing and shipment activities. All our logistic services are supported by advanced designated software.',
        'Paragon solutions can be tailored to perform all, or some, of the logistic activities in any organization.',
        'All our logistic services customers benefit from our technological infrastructure and human resources to do the job efficiently, cost-effectively and on schedule.',
      ],
    },
    services: {
      heading: 'Services',
      blurb: 'The services below are offered to give customers exactly what they need:',
      items: [
        'Inbound / Outbound',
        'Storage',
        'Order Fulfillment',
        'Cross Docking',
        'JIT Manufacturing Support',
        'Inventory Control Systems',
        'Service parts logistics',
        'On-line Inventory Management',
        'Cycle counts',
        'Pick & Pack',
        'Customer tailored activity',
        'Control by serial number',
        'Value-added activities (kitting, packing, labeling)',
      ],
    },
    closing: {
      heading: 'In-house or outsourced',
      paragraphs: [
        'A prominent aspect of our business is the extremely professional logistic services and warehousing facility we offer either in-house or as an outsourcing service.',
        'Paragon offers logistic services that are independent of our forwarding activities and are complementary to the SCM solutions we offer.',
      ],
    },
    exhibitions: {
      heading: 'Exhibitions & Special Projects',
      paragraphs: [
        'Logistics that enhance your marketing efforts.',
        'International exhibitions are an integral part of any company’s marketing and sales efforts. It is a costly venture in terms of time and resources. This is true for any operational activity which is not in the regular course of business, be it a special project or important demonstration.',
        'Exhibitions and special projects require forwarding expertise that goes beyond conventional bookings and routing. It often is multi-modal, the intricate and delicate exhibition structures are irregular in shape and packaging, the equipment is often shipped from various locations, special permits for demo equipment are required, plus logistic coordination for the actual set up. Timing is a key factor for cost-efficiency.',
        'Experience can significantly reduce the overall costs and contribute to the success in logistic terms — prioritize deliveries, split or consolidate exhibition elements, equipment and material and, most important, get all the inevitable last minute parts on time for the opening.',
      ],
    },
    exhibitionsProcess: {
      heading: 'Paragon provides turnkey or specific solutions for any size project or exhibition',
      items: [
        'Provide an annual logistic budget according to the company’s work plan. Plan with you and prepare the schedule for all the bill of materials for the project or exhibition. This pre-organization can help determine and execute other related tasks and prevent excessive last minute costs.',
        'Experienced personnel will liaise with the exhibition officials and agents and will advise and help with the intricate documentation and customs procedures.',
        'Allocate an experienced dedicated contact that follows it through 24/7.',
      ],
    },
    exhibitionsClosing:
      'You determine the required level of involvement needed to make your efforts successful.',
  },

  tracking: {
    meta: {
      title: 'Shipments Tracking',
      description:
        'Track your shipments in full transparency, with status updated automatically and secured by user name and password to your own shipments only.',
    },
    body: {
      heading: 'Shipments Tracking',
      paragraphs: [
        'Be updated every step of the way.',
        'Our website provides tracking information in full transparency, automatically updating the status of your shipment. The tracking system is completely secure by user name and password to the customer related shipment only.',
      ],
    },
    parameters: {
      heading: 'Shipments can be traced by',
      items: [
        'Transportation mode',
        'Carrier',
        'Destination',
        'Location',
        'Documents can also be viewed through the system if necessary',
      ],
    },
    cta: {
      label: 'Enter the tracking system',
      href: 'http://192.115.200.209/UnifreightWeb/',
    },
    ctaNote:
      'The tracking system (UnifreightWeb) is a separate system operated outside this website. It opens in a new tab over plain HTTP and requires the user name and password issued to you.',
  },

  nippon: {
    meta: {
      title: 'Nippon Express',
      description: `Paragon Logistics Ltd. is proud to be an agent of NX Group (formerly Nippon Express Group) in Israel — tracing back to 1872, active in ${nx.countries} countries and regions with ${nx.employees} employees.`,
    },
    body: {
      heading: 'Nippon Express',
      paragraphs: [
        'Paragon Logistics Ltd. is proud to be an agent of Nippon Express in Israel.',
        `In 2022 Nippon Express Group reorganised under a holding company structure and now trades internationally as NX Group. With a history tracing back to 1872, the group ranks ${nx.worldRank}th among the world’s freight forwarders, spans ${nx.countries} countries and regions through ${nx.locations} locations and ${nx.groupCompanies} group companies, and employs ${nx.employees} professionals — allowing it to offer highly competitive services and rates and to achieve economies of scale. Moreover, constantly looking for innovation, NX Group is ready to design “tailor made” services to fit any request of the customers and to increase the competitiveness of their products.`,
      ],
    },
    // Values come from NX Group's own published figures; the labels are ours.
    figures: [
      { value: '1872', label: 'Origins in Japan' },
      { value: nx.founded, label: 'Nippon Express Co., Ltd. founded' },
      { value: `${nx.worldRank}th`, label: 'Largest freight forwarder worldwide (A&A)' },
      { value: nx.countries, label: 'Countries and regions' },
      { value: nx.locations, label: 'Locations worldwide' },
      { value: nx.employees, label: 'Employees' },
    ],
    history: {
      heading: 'History and recognition',
      paragraphs: [
        'Nippon Express traces its roots to Riku-un Moto Kaisha, a national land-transport company established in Japan in 1872. Nippon Express Co., Ltd. itself was established in 1937, and thanks to the professional expertise and excellent service level, from the 1950s the company expanded overseas, opened its first US office in New York in 1958, and became a worldwide leader in the international freight forwarding business.',
        'In January 2022 the group moved to a holding company structure under NIPPON EXPRESS HOLDINGS, INC. and began trading internationally as NX Group. The group is ranked 4th on Armstrong & Associates’ Top 25 Global Freight Forwarders List (2026), and continues to pursue sustainability management alongside its global growth.',
      ],
    },
    warehousing: {
      heading: 'Warehousing and distribution',
      paragraphs: [
        'NX Group’s Warehouse & Distribution service uses its network across more than 50 countries to combine inventory-based and cross-dock operations, just-in-time factory warehousing, service parts warehousing, reverse logistics, e-commerce fulfilment and integrated delivery — tailored to each customer’s business model.',
        'The group also invests in warehouse digital transformation, applying automation and digital tools to reduce manual handling and give customers visibility across the supply chain from procurement to final delivery.',
      ],
    },
    services: {
      heading: 'What NX Group offers',
      items: [
        {
          title: 'Transportation',
          body: 'A high-quality transport system spanning more than 50 countries, with tailored services that balance cargo needs, cost, lead times and sustainability.',
        },
        {
          title: 'Specialized handling',
          body: 'Specialist knowledge and technology for complex, high-value cargo, controlling risks such as temperature and vibration for safe delivery anywhere in the world.',
        },
        {
          title: 'Logistics solutions',
          body: 'Warehouse and delivery services covering more than 50 countries — inventory control, distribution processing, transport and delivery across the full supply chain.',
        },
        {
          title: 'Industries',
          body: 'Specialist teams for individual industries, drawing on the global network, transport modes and expertise needed to support complex supply chains.',
        },
        {
          title: 'Aid & relief',
          body: 'Rapid, reliable delivery of relief supplies during natural disasters and other emergencies, using the group’s global network and on-site response experience.',
        },
      ],
    },
    links: [
      { label: 'www.nipponexpress.com', href: 'https://www.nipponexpress.com' },
      {
        label: 'NX Group on LinkedIn',
        href: 'https://www.linkedin.com/company/nippon-express-group/',
      },
    ],
  },

  contact: {
    meta: {
      title: 'Contact us',
      description:
        'Paragon Logistics — headquarters in Or Yehuda, logistics centre in Ramla, air branch at Ben Gurion Airport, ocean branch at Ashdod Port and ocean representative at Haifa Port.',
    },
    intro:
      'Five sites across Israel — headquarters, the logistics centre, the air branch and two ports.',
    locations: [
      {
        id: 'hq',
        name: 'Paragon Headquarter Offices',
        address: ['10 Ha-Hagana St.', 'Or Yehuda, 6022410', 'Israel'],
        email: 'info@paragon-logistics.co.il',
        phones: [
          { label: 'Tel', value: '+972-3-9730460' },
          { label: 'Fax', value: '+972-3-7586475' },
        ],
      },
      {
        id: 'ramla',
        name: 'Paragon Logistics Center',
        address: ['7 Ba’alei ha-Melakha St.', 'Ramla, 72558', 'Israel'],
        phones: [
          { label: 'Tel', value: '+972-8-9158663' },
          { label: 'Mobile', value: '+972-54-5352077' },
        ],
      },
      {
        id: 'tlv',
        name: 'Paragon Air Branch — Ben Gurion Airport, TLV',
        address: ['Swissport building', 'Derekh Khativa 8', 'Ben Gurion Airport (TLV)'],
        phones: [
          { label: 'Air Freight Services Tel', value: '+972-3-5369012' },
          { label: 'Customs Broking Services Tel', value: '+972-3-7586469' },
          { label: 'Fax', value: '+972-3-9730540' },
        ],
      },
      {
        id: 'ashdod',
        name: 'Paragon Ocean Branch — Ashdod Port',
        address: ['4 Derech Laskov', 'Ashdod Port', 'Ashdod, 7749204', 'Israel'],
        phones: [
          { label: 'Tel', value: '+972-8-6717786' },
          { label: 'Fax', value: '+972-8-6729326' },
        ],
      },
      {
        id: 'haifa',
        name: 'Paragon Ocean Rep. — Haifa Port',
        address: ['Haifa Port', 'Israel'],
        phones: [
          { label: 'Tel', value: '+972-3-7586470' },
          { label: 'Fax', value: '+972-3-7586475' },
        ],
      },
    ],
    form: {
      heading: 'Prefer a form?',
      blurb:
        'Our web form is hosted by HubSpot and opens in a new tab. You can also email or call the headquarters directly.',
      cta: {
        label: 'Contact us by web form',
        href: 'https://share.hsforms.com/1tVjMQPy2RMSKL5KFIBwZTQ28zsu',
      },
    },
  },

  accessibility: {
    meta: {
      title: 'Accessibility statement',
      description:
        'How this website is built for accessibility, what it supports, and how to tell us if something does not work for you.',
    },
    commitment: {
      heading: 'Accessibility statement',
      paragraphs: [
        'We invest real effort in making this site usable by everyone, recognising the importance of accessibility to the general population and in particular to people with disabilities.',
        'This site was rebuilt with accessibility in the markup itself rather than added by an overlay widget. That means the behaviour described below is part of the page, and works with the assistive technology and browser settings you already use.',
      ],
    },
    features: {
      heading: 'What this site does',
      items: [
        'Semantic landmarks — header, navigation, main and footer regions that screen readers can jump between, plus a “Skip to content” link as the first stop on the page.',
        'A visible focus outline on every interactive element, so keyboard-only navigation is always traceable.',
        'Full keyboard operation — every link, button and language switch is reachable and operable without a mouse.',
        'Text contrast meeting WCAG 2.1 AA against its background throughout.',
        'Respect for your operating system’s “reduce motion” setting: with it on, the animated network diagram renders immediately in its final state and no motion plays.',
        'Text that reflows without horizontal scrolling down to a 320 px viewport, and that survives browser zoom and enlarged text settings.',
        'Correct language and direction metadata on every page, so screen readers pronounce Hebrew and English correctly and right-to-left text is laid out properly.',
        'Descriptive text alternatives for images, and a text description of the network diagram for anyone who cannot see it.',
      ],
    },
    browserTips: {
      heading: 'Using your browser’s own controls',
      blurb:
        'This site does not install an accessibility toolbar. Your browser and operating system already provide these controls, and they work on every site you visit:',
      items: [
        'Zoom in or out with Ctrl and + or − (Cmd on a Mac). The layout reflows rather than clipping.',
        'Turn on high contrast or a forced-colours theme in your operating system’s display settings.',
        'Turn on “reduce motion” in your operating system’s accessibility settings to stop animation across the whole site.',
        'Use your browser’s reader mode or a screen reader to read page content in a linear order.',
        'Tab and Shift+Tab move forward and back through interactive elements; Enter activates a link or button; Space scrolls the page.',
      ],
    },
    feedback: {
      heading: 'Tell us if something does not work',
      paragraphs: [
        'We make great efforts to include everyone, but you may still find elements that are not accessible well enough. If you have difficulty browsing or viewing the site’s content, we apologise, and we ask you to let us know so we can put it right as soon as possible.',
        'Email info@paragon-logistics.co.il or call +972-3-9730460 and we will respond.',
      ],
    },
  },

  notFound: {
    meta: {
      title: 'Page not found',
      description: 'The page you were looking for does not exist on this site.',
    },
    body: 'The page you were looking for does not exist, or it has moved since you last visited.',
    cta: { label: 'Back to the home page', to: '/' },
  },
}

export default content
