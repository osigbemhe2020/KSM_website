import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { InvalidNewsContentError, parseNewsPostContent } from "@/lib/newsPostContent";
import { requireAdminApiAccess } from "@/lib/adminAuth";

async function uploadHero(file: File, altText: string) {
  const asset = await writeClient.assets.upload("image", Buffer.from(await file.arrayBuffer()), { filename: file.name, contentType: file.type });
  return { _type: "image", _key: crypto.randomUUID(), asset: { _type: "reference", _ref: asset._id }, altText };
}

export async function POST(request: NextRequest) {
  const accessDenied = await requireAdminApiAccess(request);
  if (accessDenied) {
    return accessDenied;
  }

  try {
    const data = await request.formData();
    const title = String(data.get("title") || "").trim();
    const slug = String(data.get("slug") || "").trim();
    const excerpt = String(data.get("excerpt") || "").trim();
    const author = String(data.get("author") || "").trim();
    const category = String(data.get("category") || "").trim();
    const publishedAt = String(data.get("publishedAt") || "");
    const hero = data.get("hero");
    
    if (!title || !slug || !excerpt || !author || !category || !publishedAt || !(hero instanceof File) || hero.size === 0) {
      return NextResponse.json({ error: "Title, slug, excerpt, author, category, date, and hero image are required." }, { status: 400 });
    }
    
    const content = await parseNewsPostContent(data);
    
    const document = await writeClient.create({
      _type: "newsPost",
      title,
      slug: { _type: "slug", current: slug },
      excerpt,
      author,
      publishedAt: new Date(publishedAt).toISOString(),
      category,
      tags: String(data.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
      content,
      hero: await uploadHero(hero, String(data.get("heroAlt") || "").trim())
    });
    return NextResponse.json({ id: document._id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create news post", error);
    if (error instanceof InvalidNewsContentError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create news post." }, { status: 500 });
  }
}