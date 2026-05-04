import { getTokenFromCookies } from "@/lib/auth-server";
import { verifyToken } from "@/lib/auth-client";

export async function GET() {

  const token = await getTokenFromCookies();

  const user = token ? verifyToken(token) : null;

  return Response.json({
    hasToken: !!token,
    user,
  });
}
