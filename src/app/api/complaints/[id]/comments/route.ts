import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/helpers";
import Comment from "@/models/Comment";
import Complaint from "@/models/Complaint";
import { createTimelineEvent } from "@/models/Timeline";
import User from "@/models/User";
import { Types } from "mongoose";

interface RouteContext {
  params: { id: string };
}

// ─── GET /api/complaints/:id/comments ────────────────────────────────────────

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");
    if (!userId) return errorResponse("Unauthorized", 401);

    await connectDB();

    const complaint = await Complaint.findById(params.id);
    if (!complaint) return errorResponse("Complaint not found", 404);

    if (userRole === "user" && complaint.submittedBy.toString() !== userId) {
      return errorResponse("Access denied", 403);
    }

    const comments = await Comment.find({ complaintId: params.id })
      .populate("userId", "name email role")
      .sort({ createdAt: 1 });

    return successResponse({ comments });
  } catch {
    return errorResponse("Failed to fetch comments", 500);
  }
}

// ─── POST /api/complaints/:id/comments ───────────────────────────────────────

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");
    if (!userId) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return errorResponse("Message is required");
    }
    if (message.trim().length > 1000) {
      return errorResponse("Message cannot exceed 1000 characters");
    }

    await connectDB();

    const complaint = await Complaint.findById(params.id);
    if (!complaint) return errorResponse("Complaint not found", 404);

    if (userRole === "user" && complaint.submittedBy.toString() !== userId) {
      return errorResponse("Access denied", 403);
    }

    const comment = await Comment.create({
      complaintId: params.id,
      userId: new Types.ObjectId(userId),
      message: message.trim(),
    });

    const actor = await User.findById(userId).select("name");

    await createTimelineEvent({
      complaintId: params.id,
      type: "comment",
      title: "Comment Added",
      description: `${actor?.name ?? "User"} added a comment`,
      actor: actor?.name ?? "User",
    });

    const populated = await comment.populate("userId", "name email role");

    return successResponse(
      { comment: populated },
      "Comment added successfully",
      201,
    );
  } catch {
    return errorResponse("Failed to add comment", 500);
  }
}
