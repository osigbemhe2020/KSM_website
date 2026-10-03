import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";
import { getAdminResource } from "@/lib/adminResources";
import { parseResourceData } from "@/lib/adminParser";
import { requireAdminApiAccess } from "@/lib/adminAuth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const accessDenied = await requireAdminApiAccess(request);
  if (accessDenied) {
    return accessDenied;
  }

  try {
    const { resource, id } = await params;
    const config = getAdminResource(resource);
    if (!config) {
      return NextResponse.json({ error: "Unknown resource type." }, { status: 404 });
    }

    const data = await request.formData();
    const fields = await parseResourceData(resource, data);

    await writeClient.patch(id).set(fields).commit();
    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to update admin resource", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update item." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  const accessDenied = await requireAdminApiAccess(request);
  if (accessDenied) {
    return accessDenied;
  }

  try {
    const { id } = await params;
    await writeClient.delete(id);
    return NextResponse.json({ id, deleted: true });
  } catch (error) {
    console.error("Failed to delete admin resource", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete item." },
      { status: 500 }
    );
  }
}