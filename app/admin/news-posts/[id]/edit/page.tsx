import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceForm from "@/components/admin/AdminResourceForm";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

export default async function EditNewsPostPage({ params }: Props) {
  const { id } = await params;
  const resource = getAdminResource("news-posts")!;
  const post = await client.fetch<Record<string, unknown>>(`*[_type == "newsPost" && _id == $id][0]`, { id });

  if (!post) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <Link
        href="/admin/news-posts"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to News Posts
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-forest">News &middot; Edit</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
          Edit News Post
        </h1>
      </div>

      <AdminResourceForm resource={resource} record={post} redirectUrl="/admin/news-posts" />
    </main>
  );
}