import { Request, Response } from "express";
import Item, { ItemDocument } from "../models/item.model.ts";
import User, { UserDocument } from "../models/user.model.ts";

const getReviewItems = async (req: Request, res: Response) => {
  try {
    const itemsInReview = await Item.find({ status: "in_review" })
      .populate("userId", "fullName email profilePicture")
      .sort({ createdAt: 1 });

    res.json(itemsInReview);
  } catch (error: any) {
    console.error("Admin: Error getting items in review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const approveItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.status !== "in_review") {
      return res.status(400).json({
        message: `Item is not in 'in_review' status. Current: ${item.status}`,
      });
    }

    item.status = "available";
    await item.save();

    // TODO: Optionally notify the item owner about the approval

    res.json({ message: "Item approved successfully", item });
  } catch (error: any) {
    console.error(`Admin: Error approving item ${itemId}:`, error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const rejectItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.status !== "in_review") {
      return res.status(400).json({
        message: `Item is not in 'in_review' status. Current: ${item.status}`,
      });
    }

    item.status = "rejected";
    await item.save();

    // TODO: Optionally notify the item owner about the rejection and reason

    res.json({ message: "Item rejected successfully", item });
  } catch (error: any) {
    console.error(`Admin: Error rejecting item ${itemId}:`, error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getReviewItems, approveItem, rejectItem };
