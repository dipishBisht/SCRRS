import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Routes that require authentication
const PROTECTED_PREFIXES = [
  "/api/users",
  "/api/complaints",
  "/api/admin",
];

// Routes that are always public
const PUBLIC_ROUTES = [
  "/api/auth/signup",
  "/api/auth/login",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip public routes
  if (PUBLIC_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // Check if route needs protection
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) return NextResponse.next();

  // Validate JWT from cookie
  const token = req.cookies.get("scrrs_token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  const payload = verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  // Admin-only routes
  if (pathname.startsWith("/api/admin") && payload.role !== "admin") {
    return NextResponse.json(
      { success: false, error: "Admin access required" },
      { status: 403 }
    );
  }

  // Forward user info via headers to API routes
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", payload.id);
  requestHeaders.set("x-user-email", payload.email);
  requestHeaders.set("x-user-role", payload.role);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/api/:path*"],
};