import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import {
  successResponse,
  errorResponse,
  validatePassword,
} from "@/lib/helpers";
import User from "@/models/User";

export async function PUT(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return errorResponse("Current and new password are required");
    }

    const pwdError = validatePassword(newPassword);
    if (pwdError) return errorResponse(pwdError);

    if (currentPassword === newPassword) {
      return errorResponse("New password must differ from current password");
    }

    await connectDB();

    const user = await User.findById(userId).select("+password");
    if (!user) return errorResponse("User not found", 404);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return errorResponse("Current password is incorrect", 401);

    user.password = newPassword;
    await user.save(); // triggers pre-save hash

    return successResponse(null, "Password changed successfully");
  } catch {
    return errorResponse("Failed to change password", 500);
  }
}
