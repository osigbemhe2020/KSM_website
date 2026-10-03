import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { getAdminResource } from "@/lib/adminResources";
import { parseResourceData } from "@/lib/adminParser";
import { requireAdminApiAccess } from "@/lib/adminAuth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const accessDenied = await requireAdminApiAccess(request);
  if (accessDenied) {
    return accessDenied;
  }

  try {
    const { resource } = await params;
    const config = getAdminResource(resource);
    if (!config) {
      return NextResponse.json({ error: "Unknown resource type." }, { status: 404 });
    }

    const data = await request.formData();
    const fields = await parseResourceData(resource, data);

    // If resource is a singleton, check if existing document exists to update or create
    if (config.isSingleton) {
      const existing = await writeClient.fetch<{ _id: string } | null>(
        `*[_type == "${config.documentType}"][0]{_id}`
      );
      if (existing?._id) {
        await writeClient.patch(existing._id).set(fields).commit();
        return NextResponse.json({ id: existing._id, updated: true }, { status: 200 });
      }
    }

    const document = await writeClient.create({
      _type: config.documentType,
      ...fields,
    });

    return NextResponse.json({ id: document._id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create admin resource", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create item." },
      { status: 500 }
    );
  }
}