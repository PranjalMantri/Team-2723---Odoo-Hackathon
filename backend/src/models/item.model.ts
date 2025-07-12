import mongoose, { Schema, Document } from "mongoose";

interface ItemInput {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  type: string;
  size: string;
  condition: string;
  imageUrls?: string[];
  tags?: string[];
  listingType: "swap" | "giveaway" | "sale";
  pointsCost?: number;
  status?: "available" | "pending_swap" | "swapped" | "redeemed" | "rejected";
  isApproved?: boolean;
}

export interface ItemDocument extends ItemInput, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    condition: { type: String, required: true },
    imageUrls: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    listingType: {
      type: String,
      enum: ["swap", "giveaway", "sale"],
      required: true,
      default: "swap",
    },
    pointsCost: {
      type: Number,
      required: function (this: ItemDocument) {
        return this.listingType === "sale";
      },
      min: 0,
    },
    status: {
      type: String,
      enum: ["available", "pending_swap", "swapped", "redeemed", "rejected"],
      default: "available",
    },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

itemSchema.pre("save", function (next) {
  if (this.listingType === "swap" || this.listingType === "giveaway") {
    this.pointsCost = undefined;
  }
  next();
});

const Item = mongoose.model<ItemDocument>("Item", itemSchema);

export default Item;
