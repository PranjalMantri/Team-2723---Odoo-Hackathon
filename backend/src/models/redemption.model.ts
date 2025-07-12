import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model.ts";
import { ItemDocument } from "./item.model.ts";

export interface IPointRedemption extends Document {
  userId: mongoose.Types.ObjectId | UserDocument;
  itemId: mongoose.Types.ObjectId | ItemDocument;
  pointsUsed: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const PointRedemptionSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    pointsUsed: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPointRedemption>(
  "PointRedemption",
  PointRedemptionSchema
);
