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
  console.log("=== SET COOKIE DEBUG ===");
  console.log("Setting cookie:", COOKIE_NAME);
  console.log("Token preview:", token.slice(0, 20) + "...");
  console.log("NODE_ENV:", process.env.NODE_ENV);

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
  console.log("=== GET COOKIE DEBUG ===");

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  console.log("Cookie exists:", !!token);
  if (token) {
    console.log("Token preview:", token.slice(0, 20) + "...");
  }

  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

// ─── Current User ─────────────────────────────────────────────────────────────

export async function getCurrentUser(): Promise<JWTPayload | null> {
  console.log("=== CURRENT USER DEBUG ===");

  const token = await getTokenFromCookies();

  if (!token) {
    console.log("No token found in cookies");
    return null;
  }

  const user = verifyToken(token);

  console.log("Decoded user:", user);

  return user;
}

export async function checkIsAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
