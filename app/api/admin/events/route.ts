import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { requireAdminApiAccess } from "@/lib/adminAuth";

function required(data: FormData, field: string) {
  return String(data.get(field) || "").trim();
}

function eventFields(data: FormData) {
  const startDate = required(data, "startDate");
  const endDate = required(data, "endDate");
  return {
    title: required(data, "title"),
    slug: { _type: "slug", current: required(data, "slug") },
    startDate: new Date(startDate).toISOString(),
    ...(endDate ? { endDate: new Date(endDate).toISOString() } : {}),
    time: required(data, "time"),
    location: required(data, "location"),
    description: required(data, "description"),
    category: required(data, "category"),
  };
}

export async function POST(request: NextRequest) {
  const accessDenied = await requireAdminApiAccess(request);
  if (accessDenied) {
    return accessDenied;
  }

  try {
    const data = await request.formData();
    const fields = eventFields(data);
    if (!fields.title || !fields.slug.current || !fields.startDate) return NextResponse.json({ error: "Title, slug, and start date are required." }, { status: 400 });
    const event = await writeClient.create({ _type: "event", ...fields });
    return NextResponse.json({ id: event._id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create event", error);
    return NextResponse.json({ error: "Failed to create event." }, { status: 500 });
  }
}