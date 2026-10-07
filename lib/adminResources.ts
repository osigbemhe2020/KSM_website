export type AdminField = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "richtext"
    | "number"
    | "date"
    | "datetime"
    | "select"
    | "boolean"
    | "image"
    | "list"
    | "json"
    | "stats-repeater"
    | "milestones-repeater"
    | "chapters-repeater"
    | "initiatives-repeater"
    | "impacts-repeater"
    | "leaders-repeater";
  required?: boolean;
  options?: { label: string; value: string }[] | string[];
  placeholder?: string;
  description?: string;
  group?: string;
};

export type AdminResource = {
  key: string;
  documentType: string;
  title: string;
  singular: string;
  category: "editorial" | "organization" | "mission" | "pages";
  query: string;
  order?: string;
  fields: AdminField[];
  imageField?: string;
  imageAltField?: string;
  listColumns: { label: string; field: string; type?: "text" | "image" | "badge" | "date" }[];
  searchFields?: string[];
  isSingleton?: boolean;
};

const imageFields = (name: string, label: string, group?: string): AdminField[] => [
  { name, label, type: "image", group },
  { name: `${name}Alt`, label: `${label} alt text`, type: "text", placeholder: "Descriptive alt text for accessibility", group },
];

export type AdminCategoryItem = {
  key: string;
  label: string;
  href: string;
  icon: string;
  description: string;
  isSingleton?: boolean;
};

export type AdminCategory = {
  id: string;
  name: string;
  badge: string;
  description: string;
  items: AdminCategoryItem[];
};

type PortableTextSpan = {
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  children?: PortableTextSpan[];
  style?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPortableTextSpan(value: unknown): value is PortableTextSpan {
  if (!isRecord(value)) return false;

  return (
    (value.text === undefined || typeof value.text === "string") &&
    (value.marks === undefined ||
      (Array.isArray(value.marks) && value.marks.every((mark) => typeof mark === "string")))
  );
}

function isPortableTextBlock(value: unknown): value is PortableTextBlock {
  if (!isRecord(value)) return false;

  return (
    (value.style === undefined || typeof value.style === "string") &&
    (value.children === undefined ||
      (Array.isArray(value.children) && value.children.every(isPortableTextSpan)))
  );
}

export const ADMIN_CATEGORIES: AdminCategory[] = [
  {
    id: "editorial",
    name: "Editorial & Media",
    badge: "Updates & Media",
    description: "Manage news articles, liturgical & council events, photo albums, and public FAQs.",
    items: [
      { key: "news-posts", label: "News Posts", href: "/admin/news-posts", icon: "FileText", description: "Articles, press releases & announcements" },
      { key: "events", label: "Events Calendar", href: "/admin/events", icon: "CalendarDays", description: "Upcoming & past liturgical, council & community events" },
      { key: "gallery", label: "Photo Gallery", href: "/admin/gallery", icon: "GalleryHorizontal", description: "Event pictures & council photographic memories" },
      { key: "faq", label: "FAQs", href: "/admin/faq", icon: "HelpCircle", description: "Frequently asked questions for membership and general info" },
    ],
  },
  {
    id: "organization",
    name: "People & Governance",
    badge: "Governance",
    description: "Manage council leadership (KSM, LSM, YSM), standing committees, sub-councils, and hierarchy tiers.",
    items: [
      { key: "leaders", label: "Leaders & Officers", href: "/admin/leaders", icon: "Users", description: "Executive, KSM, LSM, and YSM council leaders" },
      { key: "committees", label: "Committees", href: "/admin/committees", icon: "Workflow", description: "Standing & ad-hoc council working committees" },
      { key: "subconcils", label: "Sub-Councils", href: "/admin/subconcils", icon: "Shield", description: "Parish chapters, geographic zones & Grand Knights" },
      { key: "org-tiers", label: "Organizational Tiers", href: "/admin/org-tiers", icon: "Layers", description: "Structural levels and governance roles for /structure" },
    ],
  },
  {
    id: "mission",
    name: "Mission & Enterprise",
    badge: "Projects & Impact",
    description: "Manage community projects, investments / business ventures, charity welfare programs, and core pillars.",
    items: [
      { key: "projects", label: "Community Projects", href: "/admin/projects", icon: "FolderKanban", description: "Ongoing, completed & upcoming welfare projects" },
      { key: "ventures", label: "Business Ventures", href: "/admin/ventures", icon: "Briefcase", description: "Commercial arms & investment subsidiaries for /investments" },
      { key: "charity-programs", label: "Charity Programs", href: "/admin/charity-programs", icon: "HeartHandshake", description: "Outreach, food drives, scholarships & welfare missions" },
      { key: "pillars", label: "Core Pillars", href: "/admin/pillars", icon: "Gem", description: "Homepage 'What We Do' and 'Our Mission' focus pillars" },
    ],
  },
  {
    id: "pages",
    name: "Pages & Settings",
    badge: "Single Pages & Config",
    description: "Control global website contact information, historical timeline, and dedicated narrative story pages.",
    items: [
      { key: "site-settings", label: "Site Settings", href: "/admin/site-settings", icon: "Settings", isSingleton: true, description: "Contact info, address, office hours, logo & socials" },
      { key: "founder", label: "Founder Story", href: "/admin/pages/founder", icon: "BookOpen", isSingleton: true, description: "Rev. Fr. Abraham Ojefua biography & vision for /ourFounder" },
      { key: "st-mulumba", label: "St. Mulumba Story", href: "/admin/pages/st-mulumba", icon: "Crown", isSingleton: true, description: "Patron Saint Matthias Mulumba biography for /st.mulumba" },
      { key: "donation-page", label: "Donation Page", href: "/admin/pages/donation", icon: "Heart", isSingleton: true, description: "Donation presets, impact metrics & beneficiary testimonials" },
      { key: "timeline", label: "History Timeline", href: "/admin/timeline", icon: "Milestone", description: "Chronological historical milestones for /history" },
      { key: "static-pages", label: "Static Pages", href: "/admin/static-pages", icon: "Library", description: "Rich text pages like /how-to-join, /lsm, /ysm" },
    ],
  },
];

export const ADMIN_RESOURCES: Record<string, AdminResource> = {
  // ────────────────── EDITORIAL & MEDIA ──────────────────
  "news-posts": {
    key: "news-posts",
    documentType: "newsPost",
    title: "News Posts",
    singular: "News Post",
    category: "editorial",
    query: `*[_type == "newsPost"] | order(publishedAt desc){_id,title,slug,excerpt,author,publishedAt,category,tags,hero{asset->{url},altText}}`,
    imageField: "hero",
    imageAltField: "heroAlt",
    searchFields: ["title", "category", "author"],
    listColumns: [
      { label: "Title", field: "title", type: "image" },
      { label: "Category", field: "category", type: "badge" },
      { label: "Published At", field: "publishedAt", type: "date" },
    ],
    fields: [
      { name: "title", label: "Article Title", type: "text", required: true, placeholder: "e.g. Metro Council Hosts 2025 Annual Convention" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g. metro-council-hosts-2025-convention" },
      { name: "author", label: "Author / Byline", type: "text", required: true, placeholder: "e.g. Council Secretariat" },
      { name: "publishedAt", label: "Publish Date & Time", type: "datetime", required: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        options: ["Council News", "Event Recap", "Press Release", "Community", "Spiritual", "Liturgy"],
      },
      ...imageFields("hero", "Featured Hero Image"),
      { name: "excerpt", label: "Short Excerpt (Summary for Cards)", type: "textarea", required: true },
      { name: "tags", label: "Tags (one per line)", type: "list", placeholder: "Knighthood\nAbuja\nCharity\nConvention" },
      { name: "content", label: "Article Content", type: "json", required: true },
    ],
  },

  events: {
    key: "events",
    documentType: "event",
    title: "Events Calendar",
    singular: "Event",
    category: "editorial",
    query: `*[_type == "event"] | order(startDate asc){_id,title,slug,startDate,endDate,time,location,description,category,isFeatured}`,
    searchFields: ["title", "location", "category"],
    listColumns: [
      { label: "Event Title", field: "title" },
      { label: "Category", field: "category", type: "badge" },
      { label: "Date", field: "startDate", type: "date" },
    ],
    fields: [
      { name: "title", label: "Event Title", type: "text", required: true, placeholder: "e.g. Feast of St. Matthias Mulumba" },
      { name: "slug", label: "URL Slug", type: "text", placeholder: "e.g. feast-of-st-matthias-mulumba" },
      { name: "startDate", label: "Start Date & Time", type: "datetime", required: true },
      { name: "endDate", label: "End Date & Time (Optional)", type: "datetime" },
      { name: "time", label: "Display Time", type: "text", placeholder: "e.g. 10:00 AM – 2:00 PM" },
      { name: "location", label: "Venue / Location", type: "text", placeholder: "e.g. Our Lady Queen of Nigeria Pro-Cathedral, Abuja" },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: ["Mass & Liturgy", "Leadership & Council", "Charity & Outreach", "Youth & LSM", "General"],
      },
      { name: "isFeatured", label: "Feature on Homepage?", type: "boolean" },
      { name: "description", label: "Event Details & Description", type: "textarea" },
    ],
  },

  gallery: {
    key: "gallery",
    documentType: "galleryItem",
    title: "Photo Gallery",
    singular: "Gallery Photo",
    category: "editorial",
    query: `*[_type == "galleryItem"] | order(takenAt desc, title asc){_id,title,caption,alt,takenAt,category,image{asset->{url},altText}}`,
    imageField: "image",
    imageAltField: "alt",
    searchFields: ["title", "category", "caption"],
    listColumns: [
      { label: "Photo", field: "title", type: "image" },
      { label: "Category", field: "category", type: "badge" },
      { label: "Date Taken", field: "takenAt", type: "date" },
    ],
    fields: [
      { name: "title", label: "Photo Title", type: "text", required: true, placeholder: "e.g. 2025 Metro Council Investiture Ceremony" },
      ...imageFields("image", "Upload Photo"),
      { name: "category", label: "Album / Category", type: "select", options: ["Investiture", "Charity Outreach", "Liturgy & Mass", "Council Meetings", "Youth & Sports", "General"] },
      { name: "takenAt", label: "Date Taken", type: "date" },
      { name: "caption", label: "Caption / Description", type: "textarea", placeholder: "A brief caption detailing the occasion and participants." },
    ],
  },

  faq: {
    key: "faq",
    documentType: "faq",
    title: "Frequently Asked Questions",
    singular: "FAQ",
    category: "editorial",
    query: `*[_type == "faq"] | order(order asc, question asc){_id,question,answer,category,order,isPublished}`,
    searchFields: ["question", "category"],
    listColumns: [
      { label: "Question", field: "question" },
      { label: "Category", field: "category", type: "badge" },
      { label: "Display Order", field: "order" },
    ],
    fields: [
      { name: "question", label: "Question", type: "text", required: true, placeholder: "e.g. Who can join the Knights of St. Mulumba?" },
      { name: "answer", label: "Answer", type: "textarea", required: true, placeholder: "Comprehensive explanation..." },
      { name: "category", label: "Category", type: "select", options: ["Membership", "Structure", "Charity", "General", "LSM & Youth"] },
      { name: "order", label: "Sort Order Number", type: "number", placeholder: "1" },
      { name: "isPublished", label: "Visible on Website?", type: "boolean" },
    ],
  },

  // ────────────────── PEOPLE & GOVERNANCE ──────────────────
  leaders: {
    key: "leaders",
    documentType: "leader",
    title: "Leaders & Officers",
    singular: "Leader",
    category: "organization",
    query: `*[_type == "leader"] | order(order asc, name asc){_id,name,slug,role,category,order,served,shortBio,bioHeading,bio,responsibilities,gifts,image{asset->{url},altText}}`,
    imageField: "image",
    imageAltField: "imageAlt",
    searchFields: ["name", "role", "category"],
    listColumns: [
      { label: "Officer", field: "name", type: "image" },
      { label: "Role / Office", field: "role" },
      { label: "Wing / Category", field: "category", type: "badge" },
      { label: "Order", field: "order" },
    ],
    fields: [
      { name: "name", label: "Full Name & Titles", type: "text", required: true, placeholder: "e.g. Sir Anthony Okonkwo, KSM" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g. anthony-okonkwo" },
      { name: "role", label: "Official Role / Designation", type: "text", required: true, placeholder: "e.g. Metropolitan Grand Knight" },
      {
        name: "category",
        label: "Wing / Category",
        type: "select",
        options: [
          { label: "KSM (Knights of St. Mulumba)", value: "ksm" },
          { label: "LSM (Ladies of St. Mulumba)", value: "lsm" },
          { label: "YSM (Youths of St. Mulumba)", value: "ysm" },
        ],
      },
      { name: "order", label: "Display Priority Order", type: "number", placeholder: "1" },
      ...imageFields("image", "Leader Official Portrait"),
      { name: "served", label: "Period of Service / Sub-Council", type: "text", placeholder: "e.g. Serving since 2020 · St. Mulumba Sub-Council No. 1" },
      { name: "shortBio", label: "Summary Bio (Card Tagline)", type: "textarea", placeholder: "A brief summary highlighting their service and devotion." },
      { name: "bioHeading", label: "Full Profile Heading", type: "text", placeholder: "e.g. A Life Dedicated to Faith and Service" },
      { name: "bio", label: "Full Biography Paragraphs (one per line)", type: "list", placeholder: "First paragraph of bio...\n\nSecond paragraph..." },
      { name: "responsibilities", label: "Key Responsibilities (one per line)", type: "list", placeholder: "Council Governance\nPastoral Coordination\nFraternal Oversight" },
      { name: "gifts", label: "Special Honors / Gifts (one per line)", type: "list", placeholder: "Papal Medal of Merit\nGrand Cross of St. Mulumba" },
    ],
  },

  committees: {
    key: "committees",
    documentType: "committee",
    title: "Committees",
    singular: "Committee",
    category: "organization",
    query: `*[_type == "committee"] | order(title asc){_id,ministry,title,purpose,responsibilities,recentActivity,leadership,image{asset->{url},altText}}`,
    imageField: "image",
    imageAltField: "imageAlt",
    searchFields: ["title", "ministry"],
    listColumns: [
      { label: "Committee Name", field: "title", type: "image" },
      { label: "Ministry / Focus", field: "ministry", type: "badge" },
    ],
    fields: [
      { name: "title", label: "Committee Title", type: "text", required: true, placeholder: "e.g. Welfare & Charity Action Committee" },
      { name: "ministry", label: "Ministry / Functional Area", type: "text", placeholder: "e.g. Pastoral & Community Outreach" },
      ...imageFields("image", "Committee Photo / Banner"),
      { name: "purpose", label: "Mandate / Purpose", type: "textarea" },
      { name: "chair", label: "Committee Chairperson", type: "text", placeholder: "e.g. Sir Joseph Adekunle" },
      { name: "secretary", label: "Committee Secretary", type: "text", placeholder: "e.g. Bro. Augustine Eze" },
      { name: "responsibilities", label: "Key Responsibilities (one per line)", type: "list" },
      { name: "recentActivity", label: "Recent Achievements / Activities (one per line)", type: "list" },
    ],
  },

  subconcils: {
    key: "subconcils",
    documentType: "subCouncil",
    title: "Sub-Councils",
    singular: "Sub-Council",
    category: "organization",
    query: `*[_type == "subCouncil"] | order(region asc, name asc){_id,name,region,description,city,state,area,address,phone,email,latitude,longitude,establishedYear,grandKnight}`,
    searchFields: ["name", "region", "city", "grandKnight"],
    listColumns: [
      { label: "Sub-Council Name", field: "name" },
      { label: "Region / Zone", field: "region", type: "badge" },
      { label: "Grand Knight", field: "grandKnight" },
      { label: "Established", field: "establishedYear" },
    ],
    fields: [
      { name: "name", label: "Sub-Council Name", type: "text", required: true, placeholder: "e.g. St. Mulumba Sub-Council No. 1" },
      { name: "region", label: "Zone / Region", type: "select", options: ["CENTRAL", "NORTH", "SOUTH", "EAST", "WEST"], required: true },
      { name: "grandKnight", label: "Grand Knight / Leader", type: "text", placeholder: "e.g. Sir Patrick Ogbonna" },
      { name: "establishedYear", label: "Year Established", type: "number", placeholder: "1983" },
      { name: "description", label: "Historical Description & Profile", type: "textarea" },
      { name: "address", label: "Physical Parish / Council Address", type: "text", placeholder: "e.g. Our Lady Queen of Nigeria Pro-Cathedral, Area 3, Garki" },
      { name: "area", label: "Area / District", type: "text", placeholder: "e.g. Central Abuja" },
      { name: "city", label: "City", type: "text", placeholder: "Abuja" },
      { name: "state", label: "State", type: "text", placeholder: "FCT" },
      { name: "phone", label: "Contact Phone", type: "text", placeholder: "+234 800 000 0000" },
      { name: "email", label: "Contact Email", type: "text", placeholder: "info@subcouncil1.org" },
      { name: "latitude", label: "Map Latitude", type: "number", placeholder: "9.0579" },
      { name: "longitude", label: "Map Longitude", type: "number", placeholder: "7.4951" },
    ],
  },

  "org-tiers": {
    key: "org-tiers",
    documentType: "orgTier",
    title: "Organizational Tiers",
    singular: "Organizational Tier",
    category: "organization",
    query: `*[_type == "orgTier"] | order(order asc){_id,tier,order,title,body,roles}`,
    searchFields: ["tier", "title"],
    listColumns: [
      { label: "Tier Label", field: "tier", type: "badge" },
      { label: "Title", field: "title" },
      { label: "Order", field: "order" },
    ],
    fields: [
      { name: "tier", label: "Tier Identifier", type: "text", required: true, placeholder: "e.g. TIER 1 or LEVEL 1" },
      { name: "title", label: "Hierarchy Level Title", type: "text", required: true, placeholder: "e.g. Supreme Council of Nigeria" },
      { name: "order", label: "Display Order Priority", type: "number", required: true, placeholder: "1" },
      { name: "body", label: "Description of Governance & Mandate", type: "textarea" },
      { name: "roles", label: "Key Leadership Roles (one per line)", type: "list", placeholder: "Supreme Knight\nDeputy Supreme Knight\nSupreme Chaplain" },
    ],
  },

  // ────────────────── MISSION & ENTERPRISE ──────────────────
  projects: {
    key: "projects",
    documentType: "project",
    title: "Community Projects",
    singular: "Project",
    category: "mission",
    query: `*[_type == "project"] | order(title asc){_id,title,slug,description,status,overview,objectives,milestones,hero{asset->{url},altText}}`,
    imageField: "hero",
    imageAltField: "heroAlt",
    searchFields: ["title", "status"],
    listColumns: [
      { label: "Project Title", field: "title", type: "image" },
      { label: "Status", field: "status", type: "badge" },
    ],
    fields: [
      { name: "title", label: "Project Title", type: "text", required: true, placeholder: "e.g. St. Mulumba Hospital & Dialysis Center" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g. st-mulumba-hospital" },
      {
        name: "status",
        label: "Execution Status",
        type: "select",
        required: true,
        options: ["ONGOING", "COMPLETED", "UPCOMING"],
      },
      ...imageFields("hero", "Featured Hero Image"),
      { name: "description", label: "Short Card Summary", type: "textarea", required: true },
      { name: "overview", label: "Overview (Paragraphs, one per line)", type: "list" },
      { name: "objectives", label: "Key Objectives (one per line)", type: "list" },
      { name: "milestones", label: "Project Milestones", type: "milestones-repeater" },
    ],
  },

  ventures: {
    key: "ventures",
    documentType: "venture",
    title: "Business Ventures & Investments",
    singular: "Business Venture",
    category: "mission",
    query: `*[_type == "venture"] | order(name asc){_id,name,slug,category,tagline,industry,areaOfOperation,registered,aboutShort,aboutLong,impactText,leaders,stats}`,
    searchFields: ["name", "category", "industry"],
    listColumns: [
      { label: "Enterprise Name", field: "name" },
      { label: "Sector / Category", field: "category", type: "badge" },
      { label: "Industry", field: "industry" },
    ],
    fields: [
      { name: "name", label: "Enterprise / Company Name", type: "text", required: true, placeholder: "e.g. St. Mulumba Properties Ltd" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g. st-mulumba-properties" },
      { name: "category", label: "Category Header", type: "text", placeholder: "e.g. REAL ESTATE or FINANCIAL SERVICES" },
      { name: "industry", label: "Industry", type: "text", placeholder: "e.g. Real Estate Development" },
      { name: "registered", label: "Registration / RC Number", type: "text", placeholder: "e.g. RC 8092, Abuja, FCT" },
      { name: "areaOfOperation", label: "Area of Operation", type: "text", placeholder: "e.g. Federal Capital Territory, Nigeria" },
      { name: "tagline", label: "Core Tagline / Vision", type: "textarea" },
      { name: "aboutShort", label: "Short Section Header", type: "text", placeholder: "e.g. Who We Are" },
      { name: "aboutLong", label: "Comprehensive Company Background", type: "textarea" },
      { name: "impactText", label: "Socio-Economic & Community Impact", type: "textarea" },
      { name: "stats", label: "Key Performance Stats", type: "stats-repeater" },
      { name: "leaders", label: "Executive Directors & Management", type: "leaders-repeater" },
    ],
  },

  "charity-programs": {
    key: "charity-programs",
    documentType: "charityProgram",
    title: "Charity & Welfare Programs",
    singular: "Charity Program",
    category: "mission",
    query: `*[_type == "charityProgram"] | order(title asc){_id,title,sectionTitle,slug,tagline,overview,initiatives,impactNote,hero{asset->{url},altText}}`,
    imageField: "hero",
    imageAltField: "heroAlt",
    searchFields: ["title", "sectionTitle"],
    listColumns: [
      { label: "Program Name", field: "title", type: "image" },
      { label: "Section Sub-label", field: "sectionTitle", type: "badge" },
    ],
    fields: [
      { name: "title", label: "Program Title", type: "text", required: true, placeholder: "e.g. Annual Medical & Health Outreach" },
      { name: "sectionTitle", label: "Card Section Heading", type: "text", placeholder: "e.g. Healthcare & Wellness" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g. annual-medical-outreach" },
      ...imageFields("hero", "Program Hero Image"),
      { name: "tagline", label: "Tagline / Banner Note", type: "textarea" },
      { name: "overview", label: "Program Overview (Paragraphs, one per line)", type: "list" },
      { name: "initiatives", label: "Core Initiatives", type: "initiatives-repeater" },
      { name: "impactNote", label: "Impact Note / Summary Callout", type: "textarea" },
    ],
  },

  pillars: {
    key: "pillars",
    documentType: "pillar",
    title: "Core Pillars",
    singular: "Pillar",
    category: "mission",
    query: `*[_type == "pillar"] | order(order asc){_id,title,subtitle,icon,href,description,context,order}`,
    searchFields: ["title", "context"],
    listColumns: [
      { label: "Pillar Name", field: "title" },
      { label: "Target Context", field: "context", type: "badge" },
      { label: "Display Order", field: "order" },
    ],
    fields: [
      { name: "title", label: "Pillar Title", type: "text", required: true, placeholder: "e.g. Charity & Compassion" },
      { name: "subtitle", label: "Subtitle / Sub-label", type: "text", placeholder: "e.g. & Compassion" },
      { name: "icon", label: "Icon Symbol or Name", type: "text", placeholder: "e.g. Heart or Cross or ✦" },
      { name: "href", label: "Target URL / Learn More Link", type: "text", placeholder: "e.g. /charity" },
      { name: "description", label: "Description / Core Values", type: "textarea" },
      {
        name: "context",
        label: "Display Section / Page",
        type: "select",
        options: [
          { label: "Homepage – What We Do", value: "homepage" },
          { label: "Our Mission Page", value: "mission" },
          { label: "Both Homepage & Mission Page", value: "both" },
        ],
      },
      { name: "order", label: "Display Priority Order", type: "number", placeholder: "1" },
    ],
  },

  // ────────────────── PAGES & SITE CONFIGURATION ──────────────────
  timeline: {
    key: "timeline",
    documentType: "timelineItem",
    title: "History Timeline",
    singular: "Timeline Milestone",
    category: "pages",
    query: `*[_type == "timelineItem"] | order(order asc, year asc){_id,year,title,body,order}`,
    searchFields: ["year", "title"],
    listColumns: [
      { label: "Year", field: "year", type: "badge" },
      { label: "Event Title", field: "title" },
      { label: "Order", field: "order" },
    ],
    fields: [
      { name: "year", label: "Year / Era", type: "text", required: true, placeholder: "e.g. 1953 or 1983" },
      { name: "title", label: "Milestone Title", type: "text", required: true, placeholder: "e.g. Founding of the Order in Nigeria" },
      { name: "order", label: "Display Sequence Order", type: "number", required: true, placeholder: "1" },
      { name: "body", label: "Historical Narrative", type: "textarea", placeholder: "Detailed story of this milestone..." },
    ],
  },

  "static-pages": {
    key: "static-pages",
    documentType: "staticPage",
    title: "Static Pages",
    singular: "Static Page",
    category: "pages",
    query: `*[_type == "staticPage"] | order(title asc){_id,title,slug,description,body,timeline,heroImage{asset->{url},altText}}`,
    imageField: "heroImage",
    imageAltField: "heroImageAlt",
    searchFields: ["title", "slug"],
    listColumns: [
      { label: "Page Title", field: "title" },
      { label: "Slug Route", field: "slug", type: "badge" },
    ],
    fields: [
      { name: "title", label: "Page Title", type: "text", required: true, placeholder: "e.g. How to Join" },
      { name: "slug", label: "Slug (URL Route)", type: "text", required: true, placeholder: "e.g. how-to-join" },
      ...imageFields("heroImage", "Hero Header Image"),
      { name: "description", label: "Meta Description / Subtitle", type: "textarea" },
      { name: "bodyText", label: "Page Content (Paragraphs, one per line)", type: "list", placeholder: "First section...\n\nSecond section..." },
    ],
  },

  // ────────────────── SINGLETON DEFINITIONS ──────────────────
  "site-settings": {
    key: "site-settings",
    documentType: "siteSettings",
    title: "Global Site Settings",
    singular: "Site Settings",
    category: "pages",
    isSingleton: true,
    query: `*[_type == "siteSettings"][0]{_id,title,description,phone,email,address,officeHours,mapsUrl,donationUrl,facebookUrl,instagramUrl,whatsappUrl,logo{asset->{url},altText}}`,
    imageField: "logo",
    imageAltField: "logoAlt",
    listColumns: [{ label: "Site Name", field: "title" }],
    fields: [
      { name: "title", label: "Council Title & Brand Name", type: "text", required: true, group: "General Brand" },
      { name: "description", label: "Meta Description & Bio", type: "textarea", group: "General Brand" },
      ...imageFields("logo", "Council Crest / Logo", "General Brand"),
      { name: "phone", label: "Secretariat Phone", type: "text", placeholder: "+234 800 000 0000", group: "Contact Info" },
      { name: "email", label: "Secretariat Official Email", type: "text", placeholder: "info@ksmabuja.org", group: "Contact Info" },
      { name: "address", label: "Secretariat Physical Address", type: "textarea", group: "Contact Info" },
      { name: "officeHours", label: "Office Opening Hours", type: "text", placeholder: "Monday – Friday, 9:00 AM – 5:00 PM", group: "Contact Info" },
      { name: "mapsUrl", label: "Google Maps URL", type: "text", placeholder: "https://goo.gl/maps/...", group: "Online Links" },
      { name: "donationUrl", label: "Donation Portal Route", type: "text", placeholder: "/donate", group: "Online Links" },
      { name: "whatsappUrl", label: "WhatsApp Direct Link", type: "text", placeholder: "https://wa.me/2348000000000", group: "Social Channels" },
      { name: "facebookUrl", label: "Facebook Page URL", type: "text", placeholder: "https://facebook.com/...", group: "Social Channels" },
      { name: "instagramUrl", label: "Instagram Profile URL", type: "text", placeholder: "https://instagram.com/...", group: "Social Channels" },
    ],
  },

  founder: {
    key: "founder",
    documentType: "founder",
    title: "Founder Story Page (/ourFounder)",
    singular: "Founder Story",
    category: "pages",
    isSingleton: true,
    query: `*[_type == "founder"][0]{_id,title,slug,description,portraitCaption,founderIntro,founderBio,chapters,visionQuote,visionAttribution,heroImage{asset->{url},altText},portrait{asset->{url},altText},momentImages[]{asset->{url},altText}}`,
    imageField: "portrait",
    imageAltField: "portraitAlt",
    listColumns: [{ label: "Page Title", field: "title" }],
    fields: [
      { name: "title", label: "Page Title", type: "text", required: true, group: "Overview" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "ourFounder", group: "Overview" },
      { name: "description", label: "Hero Header Subtitle", type: "textarea", group: "Overview" },
      ...imageFields("heroImage", "Hero Header Background Image", "Media"),
      ...imageFields("portrait", "Rev. Fr. Ojefua Portrait", "Media"),
      { name: "portraitCaption", label: "Portrait Caption", type: "text", placeholder: "REV. FR. ABRAHAM OJEFUA", group: "Media" },
      { name: "founderIntro", label: "Founder Introduction Callout", type: "textarea", required: true, group: "Biography" },
      { name: "founderBio", label: "Full Biography Paragraphs (one per line)", type: "list", required: true, group: "Biography" },
      { name: "visionQuote", label: "Founding Vision Quote", type: "textarea", required: true, group: "Vision" },
      { name: "visionAttribution", label: "Vision Attribution Subtext", type: "text", required: true, placeholder: "THE VISION OF OUR FOUNDER", group: "Vision" },
      { name: "chapters", label: "Story Chapters (Chronological)", type: "chapters-repeater", group: "Story Chapters" },
    ],
  },

  "st-mulumba": {
    key: "st-mulumba",
    documentType: "stMulumba",
    title: "St. Mulumba Page (/st.mulumba)",
    singular: "St. Mulumba Story",
    category: "pages",
    isSingleton: true,
    query: `*[_type == "stMulumba"][0]{_id,title,slug,description,portraitCaption,lifeTitle,lifeParagraphs,quote,quoteAttribution,significanceTitle,significanceText,legacyTitle,legacyPoints,heroImage{asset->{url},altText},portrait{asset->{url},altText}}`,
    imageField: "portrait",
    imageAltField: "portraitAlt",
    listColumns: [{ label: "Page Title", field: "title" }],
    fields: [
      { name: "title", label: "Page Title", type: "text", required: true, group: "Overview" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "st-mulumba", group: "Overview" },
      { name: "description", label: "Hero Subtitle", type: "textarea", group: "Overview" },
      ...imageFields("heroImage", "Hero Header Image", "Media"),
      ...imageFields("portrait", "St. Matthias Mulumba Icon / Portrait", "Media"),
      { name: "portraitCaption", label: "Portrait Caption", type: "text", placeholder: "St. Matthias Mulumba — Martyr of Uganda", group: "Media" },
      { name: "lifeTitle", label: "Life Section Title", type: "text", required: true, placeholder: "The Life of St. Matthias Mulumba", group: "Life Story" },
      { name: "lifeParagraphs", label: "Life Narrative Paragraphs (one per line)", type: "list", required: true, group: "Life Story" },
      { name: "quote", label: "Featured Saint Quote", type: "textarea", required: true, group: "Quote & Significance" },
      { name: "quoteAttribution", label: "Quote Attribution", type: "text", required: true, placeholder: "THE UGANDA MARTYRS", group: "Quote & Significance" },
      { name: "significanceTitle", label: "Significance Section Title", type: "text", required: true, placeholder: "Significance to the Order", group: "Quote & Significance" },
      { name: "significanceText", label: "Significance Explanation", type: "textarea", required: true, group: "Quote & Significance" },
      { name: "legacyTitle", label: "Legacy Section Title", type: "text", required: true, placeholder: "His Lasting Legacy", group: "Legacy" },
      { name: "legacyPoints", label: "Legacy Bullet Points (one per line)", type: "list", group: "Legacy" },
    ],
  },

  "donation-page": {
    key: "donation-page",
    documentType: "donationPage",
    title: "Donation Page (/donate)",
    singular: "Donation Page",
    category: "pages",
    isSingleton: true,
    query: `*[_type == "donationPage"][0]{_id,title,slug,description,impactsTitle,impactsSubtitle,impactsDescription,impacts,donationTitle,donationDescription,presets,testimonialsTitle,testimonialQuote,testimonialAuthor,testimonialRole,heroImage{asset->{url},altText},testimonialImage{asset->{url},altText}}`,
    imageField: "heroImage",
    imageAltField: "heroImageAlt",
    listColumns: [{ label: "Page Title", field: "title" }],
    fields: [
      { name: "title", label: "Page Title", type: "text", required: true, group: "Header" },
      { name: "slug", label: "URL Slug", type: "text", required: true, placeholder: "donate", group: "Header" },
      { name: "description", label: "Hero Subtitle", type: "textarea", group: "Header" },
      ...imageFields("heroImage", "Hero Header Image", "Header"),
      { name: "donationTitle", label: "Form Section Title", type: "text", required: true, placeholder: "Make a Donation", group: "Giving Form" },
      { name: "donationDescription", label: "Giving Description", type: "textarea", required: true, group: "Giving Form" },
      { name: "presets", label: "Preset Donation Amounts (₦ comma-separated)", type: "text", placeholder: "5000, 10000, 25000, 50000", group: "Giving Form" },
      { name: "impactsTitle", label: "Impact Eyebrow Subtext", type: "text", placeholder: "WHERE YOUR GIFT GOES", group: "Impact Metrics" },
      { name: "impactsSubtitle", label: "Impact Section Title", type: "text", placeholder: "A Tangible Inheritance of Service", group: "Impact Metrics" },
      { name: "impactsDescription", label: "Impact Section Lead Text", type: "textarea", group: "Impact Metrics" },
      { name: "impacts", label: "Impact Beneficiary Cards", type: "impacts-repeater", group: "Impact Metrics" },
      { name: "testimonialsTitle", label: "Testimonials Header", type: "text", placeholder: "What Our Beneficiaries Say", group: "Testimonials" },
      { name: "testimonialQuote", label: "Testimonial Quote", type: "textarea", group: "Testimonials" },
      { name: "testimonialAuthor", label: "Beneficiary Name", type: "text", placeholder: "Mrs. Adeze", group: "Testimonials" },
      { name: "testimonialRole", label: "Beneficiary Role / Description", type: "text", placeholder: "Beneficiary, Abuja Charity Outreach", group: "Testimonials" },
      ...imageFields("testimonialImage", "Testimonial Photo", "Testimonials"),
    ],
  },
};

export function getAdminResource(key: string): AdminResource | undefined {
  return ADMIN_RESOURCES[key];
}

export function serializeAdminValue(field: AdminField, value: unknown): string {
  if (value == null) return "";
  
  // Handle rich text (HTML from TipTap editor)
  if (field.type === "richtext") {
    if (typeof value === "string") {
      return value; // Return HTML as-is
    }
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && "_type" in value[0]) {
      // Convert Portable Text to HTML for editing
      return convertPortableTextToHtml(value);
    }
    return "";
  }
  
  // Handle portable text blocks (for content fields)
  if (field.type === "list" && Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && "_type" in value[0]) {
    // This is portable text - extract text content
    return value
      .map((block: unknown) => {
        if (isPortableTextBlock(block) && block.children) {
          return block.children.map((child) => child.text ?? "").join("");
        }
        return "";
      })
      .join("\n\n");
  }
  
  if (field.type === "list") {
    return Array.isArray(value) ? value.join("\n") : "";
  }
  if (field.type === "boolean") {
    return Boolean(value) ? "true" : "false";
  }
  if (field.name === "presets" && Array.isArray(value)) {
    return value.join(", ");
  }
  if (
    field.type === "json" ||
    field.type === "stats-repeater" ||
    field.type === "milestones-repeater" ||
    field.type === "chapters-repeater" ||
    field.type === "initiatives-repeater" ||
    field.type === "impacts-repeater" ||
    field.type === "leaders-repeater"
  ) {
    return typeof value === "object" ? JSON.stringify(value, null, 2) : String(value);
  }
  if (field.type === "datetime" && typeof value === "string") {
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date.toISOString().slice(0, 16);
      }
    } catch {
      return value;
    }
  }
  return String(value);
}

// Helper function to convert Portable Text to HTML for editing
function convertPortableTextToHtml(portableText: unknown): string {
  if (!Array.isArray(portableText)) return "";
  
  return portableText.map((value: unknown) => {
    if (!isPortableTextBlock(value)) return "";

    const block = value;
    let content = "";
    if (block.children) {
      content = block.children.map((child) => {
        let text = child.text ?? "";
        // Apply inline formatting
        if (child.marks && Array.isArray(child.marks)) {
          if (child.marks.includes("strong")) {
            text = `<strong>${text}</strong>`;
          }
          if (child.marks.includes("em")) {
            text = `<em>${text}</em>`;
          }
          if (child.marks.includes("underline")) {
            text = `<u>${text}</u>`;
          }
        }
        return text;
      }).join("");
    }
    
    const tag = block.style === "h1" ? "h1" : 
               block.style === "h2" ? "h2" : 
               block.style === "h3" ? "h3" : 
               block.style === "blockquote" ? "blockquote" : "p";
    
    return `<${tag}>${content}</${tag}>`;
  }).join("\n");
}