import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceTable from "@/components/admin/AdminResourceTable";

type Props = { params: Promise<{ resource: string }> };

export const dynamic = "force-dynamic";

export default async function AdminResourceListPage({ params }: Props) {
  const { resource: key } = await params;
  const resource = getAdminResource(key);
  if (!resource) notFound();

  const records = await client.fetch<Record<string, unknown>[]>(resource.query);
  const formattedRecords = records.map((r) => ({
    ...r,
    _id: String(r._id),
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <AdminResourceTable resource={resource} records={formattedRecords} />
    </main>
  );
}