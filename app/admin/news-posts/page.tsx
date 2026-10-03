import { client } from "@/sanity/lib/client";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceTable from "@/components/admin/AdminResourceTable";

export const dynamic = "force-dynamic";

export default async function AdminNewsPostsPage() {
  const resource = getAdminResource("news-posts")!;
  const posts = await client.fetch<Record<string, unknown>[]>(resource.query);

  const formattedPosts = posts.map((p) => ({
    ...p,
    _id: String(p._id),
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <AdminResourceTable resource={resource} records={formattedPosts} />
    </main>
  );
}