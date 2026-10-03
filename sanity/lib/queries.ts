import { defineQuery } from 'next-sanity'

// ==================== SITE SETTINGS ====================
export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0]`)

// ==================== CHARITY PROGRAMS ====================
export const charityProgramsQuery = defineQuery(`
  *[_type == "charityProgram"] | order(title asc) {
    _id,
    title,
    sectionTitle,
    slug,
    tagline,
    "hero": coalesce(hero, image) {
      asset-> {
        url,
        altText
      }
    },
    overview,
    initiatives[] {
      title,
      description
    },
    impactNote,
    impactImages[] {
      title,
      image {
        asset-> {
          url,
          altText
        }
      }
    }
  }
`)

export const charityProgramBySlugQuery = defineQuery(`
  *[_type == "charityProgram" && slug.current == $slug][0] {
    _id,
    title,
    sectionTitle,
    slug,
    tagline,
    hero {
      asset-> {
        url,
        altText
      }
    },
    overview,
    initiatives[] {
      title,
      description
    },
    impactNote,
    impactImages[] {
      title,
      image {
        asset-> {
          url,
          altText
        }
      }
    }
  }
`)

// ==================== PROJECTS ====================
export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    status,
    hero {
      asset-> {
        url,
        altText
      }
    },
    overview,
    objectives,
    milestones[] {
      date,
      title,
      note
    }
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    status,
    hero {
      asset-> {
        url,
        altText
      }
    },
    overview,
    objectives,
    milestones[] {
      date,
      title,
      note
    }
  }
`)

// ==================== VENTURES ====================
export const venturesQuery = defineQuery(`
  *[_type == "venture"] | order(name asc) {
    _id,
    name,
    slug,
    category,
    tagline,
    industry,
    areaOfOperation,
    registered,
    aboutShort,
    aboutLong,
    impactText,
    leaders[] {
      role,
      name
    },
    stats[] {
      value,
      label
    }
  }
`)

export const ventureBySlugQuery = defineQuery(`
  *[_type == "venture" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    category,
    tagline,
    industry,
    areaOfOperation,
    registered,
    aboutShort,
    aboutLong,
    impactText,
    leaders[] {
      role,
      name
    },
    stats[] {
      value,
      label
    }
  }
`)

// ==================== NEWS POSTS ====================
export const newsPostsQuery = defineQuery(`
  *[_type == "newsPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    author,
    publishedAt,
    hero {
      asset-> {
        url,
        altText
      }
    },
    content,
    category,
    tags
  }
`)

export const newsPostBySlugQuery = defineQuery(`
  *[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    author,
    publishedAt,
    "hero": coalesce(hero, image) {
      asset-> {
        url,
        altText
      }
    },
    content[] {
      ...,
      _type == "contentImage" => {
        ...,
        image {
          ...,
          asset-> {
            url,
            altText
          }
        }
      },
      _type == "image" => {
        ...,
        asset-> {
          url,
          altText
        }
      }
    },
    category,
    tags
  }
`)

export const recentNewsQuery = defineQuery(`
  *[_type == "newsPost"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "hero": coalesce(hero, image) {
      asset-> {
        url,
        altText
      }
    },
    category
  }
`)

// ==================== LEADERS ====================
export const leadersQuery = defineQuery(`
  *[_type == "leader" && (!defined(category) || category == "ksm" || category == "executive")] | order(order asc, name asc) {
    _id,
    name,
    slug,
    role,
    category,
    order,
    image {
      asset-> {
        url,
        altText
      }
    },
    served,
    shortBio
  }
`)

export const lsmLeadersQuery = defineQuery(`
  *[_type == "leader" && (category == "lsm" || category == "LSM")] | order(order asc, name asc) {
    _id,
    name,
    slug,
    role,
    category,
    order,
    image {
      asset-> {
        url,
        altText
      }
    },
    served,
    shortBio
  }
`)

export const leaderBySlugQuery = defineQuery(`
  *[_type == "leader" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    category,
    order,
    image {
      asset-> {
        url,
        altText
      }
    },
    served,
    shortBio,
    bioHeading,
    bio,
    responsibilities,
    gifts
  }
`)

export const executiveLeadersQuery = defineQuery(`
  *[_type == "leader"] | order(order asc, name asc) {
    _id,
    name,
    role,
    slug,
    category,
    order,
    serving,
    served,
    shortBio,
    image {
      asset-> {
        url,
        altText
      }
    }
  }
`)


// ==================== COMMITTEES ====================
export const committeesQuery = defineQuery(`
  *[_type == "committee"] | order(title asc) {
    _id,
    title,
    ministry,
    purpose,
    responsibilities,
    recentActivity,
    leadership {
      chair,
      secretary
    },
    image {
      asset-> {
        url,
        altText
      }
    }
  }
`)

export const committeeBySlugQuery = defineQuery(`
  *[_type == "committee" && slug.current == $slug][0] {
    _id,
    title,
    ministry,
    description,
    chairperson,
    members,
    image {
      asset-> {
        url,
        altText
      }
    },
    responsibilities,
    achievements
  }
`)

// ==================== EVENTS ====================
export const eventsQuery = defineQuery(`
  *[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    time,
    location,
    description,
    category
  }
`)

export const upcomingEventsQuery = defineQuery(`
  *[_type == "event" && startDate >= now()] | order(startDate asc) [0...5] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    time,
    location,
    description,
    category
  }
`)

export const eventBySlugQuery = defineQuery(`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    time,
    location,
    description,
    category
  }
`)

// ==================== SUB-COUNCILS ====================
export const subCouncilsQuery = defineQuery(`
  *[_type == "subCouncil"] | order(name asc) {
    _id,
    name,
    region,
    description,
    city,
    state,
    area,
    address,
    phone,
    email,
    latitude,
    longitude,
    establishedYear,
    grandKnight
  }
`)

export const subCouncilBySlugQuery = defineQuery(`
  *[_type == "subCouncil" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    location,
    established,
    grandKnight,
    secretary,
    description,
    image {
      asset-> {
        url,
        altText
      }
    },
    contact {
      email,
      phone,
      address
    }
  }
`)

// ==================== ORGANIZATIONAL TIERS ====================
export const orgTiersQuery = defineQuery(`
  *[_type == "orgTier"] | order(order asc) {
    _id,
    tier,
    order,
    title,
    body,
    roles
  }
`)

// ==================== PILLARS ====================
export const pillarsQuery = defineQuery(`
  *[_type == "pillar"] | order(order asc) {
    _id,
    title,
    subtitle,
    icon,
    href,
    description,
    context,
    order
  }
`)

export const pillarsByContextQuery = defineQuery(`
  *[_type == "pillar" && context == $context] | order(order asc) {
    _id,
    title,
    subtitle,
    icon,
    href,
    description,
    order
  }
`)

// ==================== GALLERY ITEMS ====================
export const galleryItemsQuery = defineQuery(`
  *[_type == "galleryItem"] | order(title asc) {
    _id,
    title,
    slug,
    category,
    description,
    image {
      asset-> {
        url,
        altText
      }
    },
    date,
    location
  }
`)

export const galleryItemsByCategoryQuery = defineQuery(`
  *[_type == "galleryItem" && category == $category] | order(date desc) {
    _id,
    title,
    slug,
    category,
    description,
    image {
      asset-> {
        url,
        altText
      }
    },
    date,
    location
  }
`)

// ==================== FAQs ====================
export const faqsQuery = defineQuery(`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`)

export const faqsByCategoryQuery = defineQuery(`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer,
    order
  }
`)

// ==================== STATIC PAGES ====================
export const staticPagesQuery = defineQuery(`
  *[_type == "staticPage"] | order(title asc) {
    _id,
    title,
    slug,
    content,
    updatedAt
  }
`)

export const staticPageBySlugQuery = defineQuery(`
  *[_type == "staticPage" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    updatedAt
  }
`)

// ==================== INITIATIVES ====================
export const initiativesQuery = defineQuery(`
  *[_type == "initiative"] | order(title asc) {
    _id,
    title,
    description,
    impact
  }
`)

// ==================== MILESTONES ====================
export const milestonesQuery = defineQuery(`
  *[_type == "milestone"] | order(date asc) {
    _id,
    title,
    date,
    description,
    status
  }
`)

// ==================== ST. MULUMBA ====================
export const stMulumbaQuery = defineQuery(`
  *[_type == "stMulumba"][0] {
    _id,
    title,
    slug,
    description,
    heroImage {
      asset-> {
        url,
        altText
      }
    },
    portrait {
      asset-> {
        url,
        altText
      }
    },
    portraitCaption,
    lifeTitle,
    lifeParagraphs,
    quote,
    quoteAttribution,
    anthem,
    anthemComposer,
    significanceTitle,
    significanceText,
    legacyTitle,
    legacyPoints
  }
`)

// ==================== FOUNDER ====================
export const founderQuery = defineQuery(`
  *[_type == "founder"][0] {
    _id,
    title,
    slug,
    description,
    heroImage {
      asset-> {
        url,
        altText
      }
    },
    portrait {
      asset-> {
        url,
        altText
      }
    },
    portraitCaption,
    founderIntro,
    founderBio,
    chapters[] {
      label,
      title,
      body
    },
    visionQuote,
    visionAttribution,
    momentImages[] {
      asset-> {
        url,
        altText
      }
    }
  }
`)

// ==================== DONATION PAGE ====================
export const donationPageQuery = defineQuery(`
  *[_type == "donationPage"][0] {
    _id,
    title,
    slug,
    description,
    heroImage {
      asset-> {
        url,
        altText
      }
    },
    impactsTitle,
    impactsSubtitle,
    impactsDescription,
    impacts[] {
      title,
      description,
      metric,
      subtext,
      image {
        asset-> {
          url,
          altText
        }
      }
    },
    donationTitle,
    donationDescription,
    presets,
    testimonialsTitle,
    testimonialQuote,
    testimonialAuthor,
    testimonialRole,
    testimonialImage {
      asset-> {
        url,
        altText
      }
    }
  }
`)

// ==================== TIMELINE ITEMS ====================
export const timelineItemsQuery = defineQuery(`
  *[_type == "timelineItem"] | order(order asc) {
    _id,
    year,
    title,
    body,
    order
  }
`)

// ==================== COMBINED QUERIES ====================
export const homepageDataQuery = defineQuery(`
  {
    "siteSettings": *[_type == "siteSettings"][0],
    "pillars": *[_type == "pillar" && context match "homepage"] | order(order asc),
    "recentNews": *[_type == "newsPost"] | order(publishedAt desc) [0...3],
    "upcomingEvents": *[_type == "event" && startDate >= now()] | order(startDate asc) [0...3],
    "featuredProjects": *[_type == "project" && status == "ONGOING"] | order(title asc) [0...3]
  }
`)

export const missionPageDataQuery = defineQuery(`
  {
    "siteSettings": *[_type == "siteSettings"][0],
    "pillars": *[_type == "pillar" && context match "mission"] | order(order asc),
    "charityPrograms": *[_type == "charityProgram"] | order(title asc)
  }
`)

export const structurePageDataQuery = defineQuery(`
  {
    "orgTiers": *[_type == "orgTier"] | order(order asc),
    "subCouncils": *[_type == "subCouncil"] | order(name asc),
    "executiveLeaders": *[_type == "leader"] | order(name asc)
  }
`)
