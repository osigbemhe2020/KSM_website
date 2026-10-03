import { writeClient } from "@/sanity/lib/writeClient";

export function text(data: FormData, name: string): string {
  return String(data.get(name) || "").trim();
}

export function lines(data: FormData, name: string): string[] {
  return text(data, name)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function json<T = unknown>(data: FormData, name: string): T {
  const value = text(data, name);
  if (!value) return [] as unknown as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return [] as unknown as T;
  }
}

export function num(data: FormData, name: string): number {
  const val = data.get(name);
  if (!val) return 0;
  const parsed = Number(val);
  return isNaN(parsed) ? 0 : parsed;
}

export function bool(data: FormData, name: string): boolean {
  const val = data.get(name);
  return val === "true" || val === "on" || val === "1";
}

export async function uploadImage(data: FormData, field: string, altField?: string) {
  const file = data.get(field);
  if (!(file instanceof File) || file.size === 0) return undefined;
  const asset = await writeClient.assets.upload(
    "image",
    Buffer.from(await file.arrayBuffer()),
    { filename: file.name, contentType: file.type }
  );
  const altText = altField ? text(data, altField) : undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    ...(altText ? { altText, alt: altText } : {}),
  };
}

export async function parseResourceData(resource: string, data: FormData): Promise<Record<string, unknown>> {
  const doc: Record<string, unknown> = {};

  // 1. News Posts
  if (resource === "news-posts") {
    const hero = await uploadImage(data, "hero", "heroAlt");
    const contentJson = json(data, "content");
    
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: text(data, "slug") || text(data, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
      excerpt: text(data, "excerpt"),
      author: text(data, "author") || "Council Secretariat",
      publishedAt: text(data, "publishedAt") || new Date().toISOString(),
      category: text(data, "category") || "Council News",
      tags: lines(data, "tags"),
      content: contentJson || [],
    });
    if (hero) doc.hero = hero;
  }

  // 2. Events
  else if (resource === "events") {
    const slugVal = text(data, "slug") || text(data, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: slugVal },
      startDate: text(data, "startDate") || new Date().toISOString(),
      ...(text(data, "endDate") ? { endDate: text(data, "endDate") } : {}),
      time: text(data, "time"),
      location: text(data, "location"),
      category: text(data, "category") || "General",
      status: text(data, "status") || "Upcoming",
      tag: text(data, "tag") || "Upcoming",
      isFeatured: bool(data, "isFeatured"),
      description: text(data, "description"),
    });
  }

  // 3. Gallery
  else if (resource === "gallery") {
    const image = await uploadImage(data, "image", "imageAlt");
    Object.assign(doc, {
      title: text(data, "title"),
      category: text(data, "category") || "General",
      takenAt: text(data, "takenAt") || undefined,
      caption: text(data, "caption"),
      alt: text(data, "imageAlt") || text(data, "title"),
    });
    if (image) doc.image = image;
  }

  // 4. FAQs
  else if (resource === "faq") {
    Object.assign(doc, {
      question: text(data, "question"),
      answer: text(data, "answer"),
      category: text(data, "category") || "General",
      order: num(data, "order"),
      isPublished: data.has("isPublished") ? bool(data, "isPublished") : true,
    });
  }

  // 5. Leaders
  else if (resource === "leaders") {
    const image = await uploadImage(data, "image", "imageAlt");
    const slugVal = text(data, "slug") || text(data, "name").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    Object.assign(doc, {
      name: text(data, "name"),
      slug: { _type: "slug", current: slugVal },
      role: text(data, "role"),
      category: text(data, "category") || "ksm",
      order: num(data, "order"),
      served: text(data, "served"),
      shortBio: text(data, "shortBio"),
      bioHeading: text(data, "bioHeading"),
      bio: lines(data, "bio"),
      responsibilities: lines(data, "responsibilities"),
      gifts: lines(data, "gifts"),
    });
    if (image) doc.image = image;
  }

  // 6. Committees
  else if (resource === "committees") {
    const image = await uploadImage(data, "image", "imageAlt");
    Object.assign(doc, {
      title: text(data, "title"),
      ministry: text(data, "ministry"),
      purpose: text(data, "purpose"),
      responsibilities: lines(data, "responsibilities"),
      recentActivity: lines(data, "recentActivity"),
      leadership: {
        chair: text(data, "chair"),
        secretary: text(data, "secretary"),
      },
    });
    if (image) doc.image = image;
  }

  // 7. Sub-Councils
  else if (resource === "subconcils") {
    Object.assign(doc, {
      name: text(data, "name"),
      region: text(data, "region") || "CENTRAL",
      grandKnight: text(data, "grandKnight"),
      establishedYear: num(data, "establishedYear"),
      description: text(data, "description"),
      address: text(data, "address"),
      area: text(data, "area"),
      city: text(data, "city") || "Abuja",
      state: text(data, "state") || "FCT",
      phone: text(data, "phone"),
      email: text(data, "email"),
      latitude: num(data, "latitude"),
      longitude: num(data, "longitude"),
    });
  }

  // 8. Org Tiers
  else if (resource === "org-tiers") {
    Object.assign(doc, {
      tier: text(data, "tier"),
      title: text(data, "title"),
      order: num(data, "order"),
      body: text(data, "body"),
      roles: lines(data, "roles"),
    });
  }

  // 9. Projects
  else if (resource === "projects") {
    const hero = await uploadImage(data, "hero", "heroAlt");
    const rawMilestones = json<Array<{ date: string; title: string; note?: string }>>(data, "milestones");
    const milestones = Array.isArray(rawMilestones)
      ? rawMilestones.map((m, idx) => ({ _type: "milestone", _key: `m_${idx}`, date: m.date, title: m.title, note: m.note || "" }))
      : [];
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: text(data, "slug") || text(data, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      description: text(data, "description"),
      status: text(data, "status") || "ONGOING",
      overview: lines(data, "overview"),
      objectives: lines(data, "objectives"),
      milestones,
    });
    if (hero) doc.hero = hero;
  }

  // 10. Ventures
  else if (resource === "ventures") {
    const rawStats = json<Array<{ value: string; label: string }>>(data, "stats");
    const stats = Array.isArray(rawStats)
      ? rawStats.map((s, idx) => ({ _type: "stat", _key: `stat_${idx}`, value: s.value, label: s.label }))
      : [];
    const rawLeaders = json<Array<{ role: string; name: string }>>(data, "leaders");
    const leaders = Array.isArray(rawLeaders)
      ? rawLeaders.map((l, idx) => ({ _type: "object", _key: `leader_${idx}`, role: l.role, name: l.name }))
      : [];
    Object.assign(doc, {
      name: text(data, "name"),
      slug: { _type: "slug", current: text(data, "slug") || text(data, "name").toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      category: text(data, "category"),
      industry: text(data, "industry"),
      registered: text(data, "registered"),
      areaOfOperation: text(data, "areaOfOperation"),
      tagline: text(data, "tagline"),
      aboutShort: text(data, "aboutShort"),
      aboutLong: text(data, "aboutLong"),
      impactText: text(data, "impactText"),
      stats,
      leaders,
    });
  }

  // 11. Charity Programs
  else if (resource === "charity-programs") {
    const hero = await uploadImage(data, "hero", "heroAlt");
    const rawInitiatives = json<Array<{ title: string; description: string }>>(data, "initiatives");
    const initiatives = Array.isArray(rawInitiatives)
      ? rawInitiatives.map((init, idx) => ({ _type: "initiative", _key: `init_${idx}`, title: init.title, description: init.description }))
      : [];
    Object.assign(doc, {
      title: text(data, "title"),
      sectionTitle: text(data, "sectionTitle"),
      slug: { _type: "slug", current: text(data, "slug") || text(data, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      tagline: text(data, "tagline"),
      overview: lines(data, "overview"),
      initiatives,
      impactNote: text(data, "impactNote"),
    });
    if (hero) doc.hero = hero;
  }

  // 12. Pillars
  else if (resource === "pillars") {
    Object.assign(doc, {
      title: text(data, "title"),
      subtitle: text(data, "subtitle"),
      icon: text(data, "icon"),
      href: text(data, "href"),
      description: text(data, "description"),
      context: text(data, "context") || "both",
      order: num(data, "order"),
    });
  }

  // 13. Timeline
  else if (resource === "timeline") {
    Object.assign(doc, {
      year: text(data, "year"),
      title: text(data, "title"),
      order: num(data, "order"),
      body: text(data, "body"),
    });
  }

  // 14. Static Pages
  else if (resource === "static-pages") {
    const heroImage = await uploadImage(data, "heroImage", "heroImageAlt");
    const bodyLines = lines(data, "bodyText");
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: text(data, "slug") || text(data, "title").toLowerCase().replace(/[^a-z0-9]+/g, "-") },
      description: text(data, "description"),
      body: bodyLines.map((p, idx) => ({
        _type: "block",
        _key: `block_${idx}`,
        style: "normal",
        children: [{ _type: "span", _key: `span_${idx}`, text: p, marks: [] }],
      })),
    });
    if (heroImage) doc.heroImage = heroImage;
  }

  // 15. Singletons
  else if (resource === "site-settings") {
    const logo = await uploadImage(data, "logo", "logoAlt");
    Object.assign(doc, {
      title: text(data, "title"),
      description: text(data, "description"),
      phone: text(data, "phone"),
      email: text(data, "email"),
      address: text(data, "address"),
      officeHours: text(data, "officeHours"),
      mapsUrl: text(data, "mapsUrl"),
      donationUrl: text(data, "donationUrl"),
      whatsappUrl: text(data, "whatsappUrl"),
      facebookUrl: text(data, "facebookUrl"),
      instagramUrl: text(data, "instagramUrl"),
    });
    if (logo) doc.logo = logo;
  }

  else if (resource === "founder") {
    const heroImage = await uploadImage(data, "heroImage", "heroImageAlt");
    const portrait = await uploadImage(data, "portrait", "portraitAlt");
    const rawChapters = json<Array<{ label: string; title: string; body: string }>>(data, "chapters");
    const chapters = Array.isArray(rawChapters)
      ? rawChapters.map((c, idx) => ({ _type: "object", _key: `ch_${idx}`, label: c.label, title: c.title, body: c.body }))
      : [];
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: text(data, "slug") || "ourFounder" },
      description: text(data, "description"),
      portraitCaption: text(data, "portraitCaption"),
      founderIntro: text(data, "founderIntro"),
      founderBio: lines(data, "founderBio"),
      visionQuote: text(data, "visionQuote"),
      visionAttribution: text(data, "visionAttribution"),
      chapters,
    });
    if (heroImage) doc.heroImage = heroImage;
    if (portrait) doc.portrait = portrait;
  }

  else if (resource === "st-mulumba") {
    const heroImage = await uploadImage(data, "heroImage", "heroImageAlt");
    const portrait = await uploadImage(data, "portrait", "portraitAlt");
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: text(data, "slug") || "st-mulumba" },
      description: text(data, "description"),
      portraitCaption: text(data, "portraitCaption"),
      lifeTitle: text(data, "lifeTitle"),
      lifeParagraphs: lines(data, "lifeParagraphs"),
      quote: text(data, "quote"),
      quoteAttribution: text(data, "quoteAttribution"),
      significanceTitle: text(data, "significanceTitle"),
      significanceText: text(data, "significanceText"),
      legacyTitle: text(data, "legacyTitle"),
      legacyPoints: lines(data, "legacyPoints"),
    });
    if (heroImage) doc.heroImage = heroImage;
    if (portrait) doc.portrait = portrait;
  }

  else if (resource === "donation-page") {
    const heroImage = await uploadImage(data, "heroImage", "heroImageAlt");
    const testimonialImage = await uploadImage(data, "testimonialImage", "testimonialImageAlt");
    const rawPresets = text(data, "presets")
      .split(",")
      .map((p) => Number(p.trim()))
      .filter((p) => !isNaN(p) && p > 0);
    const rawImpacts = json<Array<{ title: string; description: string; metric: string; subtext: string }>>(data, "impacts");
    const impacts = Array.isArray(rawImpacts)
      ? rawImpacts.map((imp, idx) => ({ _type: "object", _key: `imp_${idx}`, title: imp.title, description: imp.description, metric: imp.metric, subtext: imp.subtext }))
      : [];
    Object.assign(doc, {
      title: text(data, "title"),
      slug: { _type: "slug", current: text(data, "slug") || "donate" },
      description: text(data, "description"),
      donationTitle: text(data, "donationTitle"),
      donationDescription: text(data, "donationDescription"),
      presets: rawPresets.length ? rawPresets : [5000, 10000, 25000, 50000],
      impactsTitle: text(data, "impactsTitle"),
      impactsSubtitle: text(data, "impactsSubtitle"),
      impactsDescription: text(data, "impactsDescription"),
      impacts,
      testimonialsTitle: text(data, "testimonialsTitle"),
      testimonialQuote: text(data, "testimonialQuote"),
      testimonialAuthor: text(data, "testimonialAuthor"),
      testimonialRole: text(data, "testimonialRole"),
    });
    if (heroImage) doc.heroImage = heroImage;
    if (testimonialImage) doc.testimonialImage = testimonialImage;
  }

  return doc;
}
