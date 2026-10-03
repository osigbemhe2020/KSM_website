import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceForm from "@/components/admin/AdminResourceForm";

export const dynamic = "force-dynamic";

export default async function StMulumbaAdminPage() {
  const resource = getAdminResource("st-mulumba");
  if (!resource) notFound();

  const record = await client.fetch<Record<string, unknown> | null>(resource.query);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-forest">Pages &amp; Settings &middot; Singleton</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
          St. Mulumba Story Page (/st.mulumba)
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage St. Matthias Mulumba&apos;s biography, significance to the Order, quotes, legacy points, and icon portrait.
        </p>
      </div>

      <AdminResourceForm resource={resource} record={record || undefined} />
    </main>
  );
}
