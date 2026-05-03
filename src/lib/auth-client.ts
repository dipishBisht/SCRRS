import jwt from "jsonwebtoken";
import { JWTPayload, Role } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = "7d";

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


// ─── Role Guards ─────────────────────────────────────────────────────────────

export function requireRole(...roles: Role[]) {
  return (user: JWTPayload | null): user is JWTPayload => {
    if (!user) return false;
    return roles.includes(user.role);
  };
}

export const isAdmin = requireRole("admin");
export const isStaff = requireRole("admin", "staff");
