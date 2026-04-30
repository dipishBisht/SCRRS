import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWTPayload, Role } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";
const COOKIE_NAME = "scrrs_token";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env.local file");
}

// ─── Token Generation ────────────────────────────────────────────────────────

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Helpers ──────────────────────────────────────────────────────────

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

// ─── Current User ─────────────────────────────────────────────────────────────

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
}

// ─── Role Guards ─────────────────────────────────────────────────────────────

export function requireRole(...roles: Role[]) {
  return (user: JWTPayload | null): user is JWTPayload => {
    if (!user) return false;
    return roles.includes(user.role);
  };
}

export const isAdmin = requireRole("admin");
export const isStaff = requireRole("admin", "staff");
