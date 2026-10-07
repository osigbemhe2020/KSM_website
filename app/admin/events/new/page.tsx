import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAdminResource } from "@/lib/adminResources";
import AdminResourceForm from "@/components/admin/AdminResourceForm";

export default function NewEventPage() {
  const resource = getAdminResource("events")!;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <Link
        href="/admin/events"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Events
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-forest">Events &middot; New</p>
        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-slate-900 md:text-4xl">
          Schedule New Event
        </h1>
      </div>

      <AdminResourceForm resource={resource} redirectUrl="/admin/events" />
    </main>
  );
}