import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import {
  successResponse,
  errorResponse,
  suggestDepartment,
  getPagination,
  paginationMeta,
} from "@/lib/helpers";
import Complaint, { getNextComplaintId } from "@/models/Complaint";
import { createTimelineEvent } from "@/models/Timeline";
import User from "@/models/User";
import { Types } from "mongoose";

// ─── GET /api/complaints ──────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");
    if (!userId) return errorResponse("Unauthorized", 401);

    const { searchParams } = req.nextUrl;
    const { page, limit, skip } = getPagination(
      searchParams.get("page") ?? "1",
      searchParams.get("limit") ?? "10",
    );

    const status = searchParams.get("status");
    const department = searchParams.get("department");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");

    // Build filter query
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    // Non-admins only see their own complaints
    if (userRole === "user") filter.submittedBy = userId;

    if (status) filter.status = status;
    if (department) filter.department = department;
    if (priority) filter.priority = priority;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { complaintId: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    await connectDB();

    const [complaints, total] = await Promise.all([
      Complaint.find(filter)
        .populate("submittedBy", "name email")
        .populate("assignedTo", "name email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Complaint.countDocuments(filter),
    ]);

    return successResponse({
      complaints,
      pagination: paginationMeta(total, page, limit),
    });
  } catch {
    return errorResponse("Failed to fetch complaints", 500);
  }
}

// ─── POST /api/complaints ─────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");
    if (!userId) return errorResponse("Unauthorized", 401);

    const body = await req.json();
    const { title, description, category, location, priority, attachments } =
      body;
    let { department } = body;

    // Required field validation
    if (!title || !description || !category || !location) {
      return errorResponse(
        "Title, description, category and location are required",
      );
    }
    if (title.trim().length < 5)
      return errorResponse("Title must be at least 5 characters");
    if (description.trim().length < 10)
      return errorResponse("Description must be at least 10 characters");

    // Smart routing: auto-detect department if not provided
    if (!department) {
      department = suggestDepartment(title, description);
    }

    await connectDB();

    const complaintId = await getNextComplaintId();

    const complaint = await Complaint.create({
      complaintId,
      title: title.trim(),
      description: description.trim(),
      department,
      category: category.trim(),
      location: location.trim(),
      priority: priority ?? "Medium",
      status: "Pending",
      submittedBy: new Types.ObjectId(userId),
      attachments: attachments ?? [],
    });

    // Auto-assign to staff in matching department (if staff member exists)
    if (userRole !== "user") {
      const staffMember = await User.findOne({
        role: "staff",
        department,
      });
      if (staffMember) {
        complaint.assignedTo = staffMember._id;
        await complaint.save();
      }
    }

    // Create timeline entry
    const submitter = await User.findById(userId).select("name");
    await createTimelineEvent({
      complaintId: complaint._id.toString(),
      type: "created",
      title: "Complaint Submitted",
      description: `Complaint ${complaintId} was submitted and routed to ${department} department`,
      actor: submitter?.name ?? "User",
    });

    const populated = await complaint.populate([
      { path: "submittedBy", select: "name email" },
      { path: "assignedTo", select: "name email role" },
    ]);

    return successResponse(
      { complaint: populated },
      "Complaint submitted successfully",
      201,
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create complaint";
    return errorResponse(message, 500);
  }
}
