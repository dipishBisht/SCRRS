"use server";
import { cookies } from "next/headers";
import { JWTPayload } from "@/types";
import { verifyToken } from "./auth-client";

const JWT_SECRET = process.env.JWT_SECRET as string;
const COOKIE_NAME = "scrrs_token";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env.local file");
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

export async function checkIsAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
