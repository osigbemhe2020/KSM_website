import { client } from "@/sanity/lib/client";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceTable from "@/components/admin/AdminResourceTable";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const resource = getAdminResource("events")!;
  const events = await client.fetch<Record<string, unknown>[]>(resource.query);

  const formattedEvents = events.map((e) => ({
    ...e,
    _id: String(e._id),
  }));

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <AdminResourceTable resource={resource} records={formattedEvents} />
    </main>
  );
}