import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { InvalidNewsContentError, parseNewsPostContent } from "@/lib/newsPostContent";

async function uploadHero(file: File, altText: string) {
  const asset = await writeClient.assets.upload("image", Buffer.from(await file.arrayBuffer()), { filename: file.name, contentType: file.type });
  return { _type: "image", _key: crypto.randomUUID(), asset: { _type: "reference", _ref: asset._id }, altText };
}

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const data = await request.formData();
    const patch: Record<string, unknown> = {
      title: String(data.get("title") || "").trim(),
      slug: { _type: "slug", current: String(data.get("slug") || "").trim() },
      excerpt: String(data.get("excerpt") || "").trim(),
      author: String(data.get("author") || "").trim(),
      publishedAt: new Date(String(data.get("publishedAt") || "")).toISOString(),
      category: String(data.get("category") || "").trim(),
      tags: String(data.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    
    patch.content = await parseNewsPostContent(data);
    
    const hero = data.get("hero");
    if (hero instanceof File && hero.size > 0) {
      patch.hero = await uploadHero(hero, String(data.get("heroAlt") || "").trim());
    } else if (data.has("heroAlt")) {
      // Only update alt text if no new image but alt text changed
      const existingDoc = await writeClient.fetch(`*[_type == "newsPost" && _id == $id][0]{hero}`, { id });
      if (existingDoc?.hero) {
        patch.hero = { ...existingDoc.hero, altText: String(data.get("heroAlt") || "").trim() };
      }
    }
    if (!patch.title || !patch.slug || !patch.excerpt || !patch.author || !patch.category) {
      return NextResponse.json({ error: "Title, slug, excerpt, author, and category are required." }, { status: 400 });
    }
    await writeClient.patch(id).set(patch).commit();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to update news post", error);
    if (error instanceof InvalidNewsContentError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update news post." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    await writeClient.delete(id);
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to delete news post", error);
    return NextResponse.json({ error: "Failed to delete news post." }, { status: 500 });
  }
}