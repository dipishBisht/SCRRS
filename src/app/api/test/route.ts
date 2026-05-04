import { getTokenFromCookies } from "@/lib/auth";
import { verifyToken } from "@/lib/auth-client";

export async function GET() {
  console.log("=== DEBUG AUTH ROUTE ===");

  const token = await getTokenFromCookies();
  console.log("Token:", token ? "EXISTS" : "MISSING");

  const user = token ? verifyToken(token) : null;

  return Response.json({
    hasToken: !!token,
    user,
  });
}
