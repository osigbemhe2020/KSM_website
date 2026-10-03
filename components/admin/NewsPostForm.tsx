"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type ExistingPost = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  content?: Array<{ children?: Array<{ text?: string }> }>;
  hero?: { asset?: { url?: string }; altText?: string };
};

function contentToText(content?: ExistingPost["content"]) {
  return content?.map((block) => block.children?.map((child) => child.text || "").join("")).filter(Boolean).join("\n\n") || "";
}

export default function NewsPostForm({ post }: { post?: ExistingPost }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(post?.hero?.asset?.url || "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch(post ? `/api/admin/news-posts/${post._id}` : "/api/admin/news-posts", {
      method: post ? "PATCH" : "POST",
      body: formData,
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({ error: "Unable to save post." }));
      setError(result.error || "Unable to save post.");
      setSaving(false);
      return;
    }
    router.push("/member-page/admin/news-posts");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="border border-slate-200 p-6 md:p-8">
      {error && <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">Title *</span><input name="title" required defaultValue={post?.title} className="admin-input" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Slug *</span><input name="slug" required defaultValue={post?.slug?.current} className="admin-input" placeholder="news-post-slug" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Category *</span><input name="category" required defaultValue={post?.category} className="admin-input" placeholder="Announcements" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Published *</span><input name="publishedAt" type="datetime-local" required defaultValue={post?.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ""} className="admin-input" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Tags</span><input name="tags" defaultValue={post?.tags?.join(", ")} className="admin-input" placeholder="community, outreach" /></label>
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">Excerpt *</span><textarea name="excerpt" required rows={3} defaultValue={post?.excerpt} className="admin-input" /></label>
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">Content</span><textarea name="content" rows={10} defaultValue={contentToText(post?.content)} className="admin-input" placeholder="Write one paragraph per block..." /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Hero image {post ? "(choose a new image to replace it)" : "*"}</span><input name="hero" type="file" accept="image/*" required={!post} onChange={(event) => setImagePreview(event.target.files?.[0] ? URL.createObjectURL(event.target.files[0]) : imagePreview)} className="block w-full text-sm text-slate-600 file:mr-4 file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-medium" />{imagePreview && <img src={imagePreview} alt="Current hero" className="mt-4 h-32 w-56 object-cover" />}</label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Hero alt text</span><input name="altText" defaultValue={post?.hero?.altText} className="admin-input" placeholder="Describe the image" /></label>
      </div>
      <div className="mt-8 flex items-center gap-4"><button type="submit" disabled={saving} className="bg-orange-600 px-5 py-3 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50">{saving ? "Saving..." : post ? "Save Changes" : "Create Post"}</button><Link href="/member-page/admin/news-posts" className="text-sm text-slate-600 hover:text-slate-950">Cancel</Link></div>
    </form>
  );
}