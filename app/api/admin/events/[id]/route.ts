import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

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

type Props = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const data = await request.formData();
    const fields = eventFields(data);
    if (!fields.title || !fields.slug.current || !fields.startDate) return NextResponse.json({ error: "Title, slug, and start date are required." }, { status: 400 });
    await writeClient.patch(id).set(fields).commit();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to update event", error);
    return NextResponse.json({ error: "Failed to update event." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    await writeClient.delete(id);
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to delete event", error);
    return NextResponse.json({ error: "Failed to delete event." }, { status: 500 });
  }
}