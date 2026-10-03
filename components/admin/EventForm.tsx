"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type ExistingEvent = {
  _id: string;
  title: string;
  slug?: { current?: string };
  startDate: string;
  endDate?: string;
  time?: string;
  location?: string;
  description?: string;
  category?: string;
};

const categories = ["Mass & Liturgy", "Leadership & Council", "Charity & Outreach", "Youth & LSM", "General"];

function toDateTimeLocal(value?: string) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

export default function EventForm({ event }: { event?: ExistingEvent }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(formEvent.currentTarget);
    const response = await fetch(event ? `/api/admin/events/${event._id}` : "/api/admin/events", {
      method: event ? "PATCH" : "POST",
      body: formData,
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({ error: "Unable to save event." }));
      setError(result.error || "Unable to save event.");
      setSaving(false);
      return;
    }
    router.push("/member-page/admin/events");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="border border-slate-200 p-6 md:p-8">
      {error && <p className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">Event title *</span><input name="title" required defaultValue={event?.title} className="admin-input" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Slug *</span><input name="slug" required defaultValue={event?.slug?.current} className="admin-input" placeholder="event-slug" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Category</span><select name="category" defaultValue={event?.category || "General"} className="admin-input">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Start date and time *</span><input name="startDate" type="datetime-local" required defaultValue={toDateTimeLocal(event?.startDate)} className="admin-input" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">End date and time</span><input name="endDate" type="datetime-local" defaultValue={toDateTimeLocal(event?.endDate)} className="admin-input" /></label>
        <label className="block"><span className="mb-2 block text-sm font-medium">Display time</span><input name="time" defaultValue={event?.time} className="admin-input" placeholder="11:00 AM - 2:00 PM" /></label>
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">Location</span><input name="location" defaultValue={event?.location} className="admin-input" placeholder="Venue or address" /></label>
        <label className="block md:col-span-2"><span className="mb-2 block text-sm font-medium">Description</span><textarea name="description" rows={6} defaultValue={event?.description} className="admin-input" /></label>
      </div>
      <div className="mt-8 flex items-center gap-4"><button type="submit" disabled={saving} className="bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest/90 disabled:opacity-50">{saving ? "Saving..." : event ? "Save Changes" : "Create Event"}</button><Link href="/member-page/admin/events" className="text-sm text-slate-600 hover:text-slate-950">Cancel</Link></div>
    </form>
  );
}