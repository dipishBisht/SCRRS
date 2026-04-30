import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/helpers";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return errorResponse("Unauthorized", 401);

    await connectDB();
    const user = await User.findById(userId);
    if (!user) return errorResponse("User not found", 404);

    return successResponse({ user });
  } catch {
    return errorResponse("Failed to fetch user", 500);
  }
}
