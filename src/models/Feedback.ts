import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema({
  complaintId: { type: Schema.Types.ObjectId, ref: "Complaint", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);