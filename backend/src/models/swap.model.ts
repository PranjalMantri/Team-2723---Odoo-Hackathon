import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model.ts";
import { ItemDocument } from "./item.model.ts";

export interface SwapRequestInput {
  requesterUserId: mongoose.Types.ObjectId | UserDocument;
  offeredItemId: mongoose.Types.ObjectId | ItemDocument;
  requestedItemId: mongoose.Types.ObjectId | ItemDocument;
  status: "pending" | "accepted" | "rejected" | "completed" | "cancelled";
  message?: string;
}

export interface SwapDocument extends SwapRequestInput, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const SwapRequestSchema: Schema = new Schema(
  {
    requesterUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offeredItemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    requestedItemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed", "cancelled"],
      default: "pending",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SwapRequest = mongoose.model<SwapDocument>(
  "SwapRequest",
  SwapRequestSchema
);

export default SwapRequest;
