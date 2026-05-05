import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookies = req.cookies.getAll();
  const headers = Object.fromEntries(req.headers.entries());
  
  return Response.json({
    cookies,
    cookieHeader: headers["cookie"] ?? "none",
    host: headers["host"],
    env: {
      hasJwtSecret: !!process.env.JWT_SECRET,
      jwtSecretLength: process.env.JWT_SECRET?.length ?? 0,
      nodeEnv: process.env.NODE_ENV,
    }
  });
}