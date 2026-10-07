import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceForm from "@/components/admin/AdminResourceForm";

type Props = { params: Promise<{ resource: string }> };

export default async function AdminResourceNewPage({ params }: Props) {
  const { resource: key } = await params;
  const resource = getAdminResource(key);
  if (!resource) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <Link
        href={`/admin/${resource.key}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to {resource.title}
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-forest">{resource.title} &middot; New</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
          Create New {resource.singular}
        </h1>
      </div>

      <AdminResourceForm resource={resource} />
    </main>
  );
}