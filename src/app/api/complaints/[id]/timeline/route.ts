import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/helpers";
import Timeline from "@/models/Timeline";
import Complaint from "@/models/Complaint";

interface RouteContext {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");
    if (!userId) return errorResponse("Unauthorized", 401);

    await connectDB();

    const complaint = await Complaint.findById(params.id);
    if (!complaint) return errorResponse("Complaint not found", 404);

    // Users can only view timeline for their own complaints
    if (
      userRole === "user" &&
      complaint.submittedBy.toString() !== userId
    ) {
      return errorResponse("Access denied", 403);
    }

    const timeline = await Timeline.find({ complaintId: params.id }).sort({
      timestamp: 1,
    });

    return successResponse({ timeline });
  } catch {
    return errorResponse("Failed to fetch timeline", 500);
  }
}