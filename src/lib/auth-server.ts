"use server";
import { cookies } from "next/headers";
import { JWTPayload } from "@/types";
import { verifyToken } from "./auth-client";

const COOKIE_NAME = "scrrs_token";

// ─── Cookie Helpers ──────────────────────────────────────────────────────────

/**
 * Retrieve the authentication token from cookies
 */
export async function getTokenFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value ?? null;
  } catch (error) {
    console.error("Failed to read cookie:", error);
    return null;
  }
}

/**
 * Set the authentication cookie (httpOnly, secure)
 */
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

/**
 * Clear the authentication cookie (logout)
 */
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
}

// ─── Current User Helper (for API routes) ───────────────────────────────────

/**
 * Get the currently authenticated user from the cookie.
 * Returns JWTPayload if valid, otherwise null.
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getTokenFromCookies();
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Check if the user is authenticated (token exists & valid)
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}