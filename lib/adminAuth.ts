import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3002";

type AdminAccess =
  | { allowed: true }
  | { allowed: false; status: 401 | 403 };

export async function getAdminAccess(cookieHeader: string | null): Promise<AdminAccess> {
  if (!cookieHeader) {
    return { allowed: false, status: 401 };
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  if (response.status === 401) {
    return { allowed: false, status: 401 };
  }

  if (response.status === 403) {
    return { allowed: false, status: 403 };
  }

  if (!response.ok) {
    throw new Error(`Admin authentication check failed with status ${response.status}`);
  }

  const data: { user?: { isAdmin?: boolean } } = await response.json();
  return data.user?.isAdmin === true
    ? { allowed: true }
    : { allowed: false, status: 403 };
}

export async function requireAdminApiAccess(request: NextRequest) {
  const access = await getAdminAccess(request.headers.get("cookie"));
  if (access.allowed) {
    return null;
  }

  return NextResponse.json(
    { error: access.status === 401 ? "Authentication required." : "Admin access required." },
    { status: access.status }
  );
}
