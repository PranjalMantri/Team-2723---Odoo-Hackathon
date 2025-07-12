import { Request, Response } from "express";
import mongoose from "mongoose";
import User, { UserDocument } from "../models/user.model.ts";
import Item, { ItemDocument } from "../models/item.model.ts";
import PointRedemption from "../models/redemption.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export const initiateRedemption = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  const userId = req.user!.id;

  if (!itemId) {
    return res
      .status(400)
      .json({ message: "Item ID is required for redemption" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const item = await Item.findById(itemId).session(session);
    const user = await User.findById(userId).session(session);

    if (!item) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Item not found" });
    }

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "User not found (auth error)" });
    }

    if (item.userId.toString() === userId) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Cannot redeem your own product" });
    }

    if (item.status !== "available") {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Item is not available for redemption" });
    }

    if (item.listingType !== "sell") {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "This item is not listed for point redemption" });
    }

    if (user.pointsBalance < item.pointsCost) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Not enough points to redeem this item" });
    }

    user.pointsBalance -= item.pointsCost;
    await user.save({ session });

    item.status = "pending_redemption";
    await item.save({ session });

    const redemption = await PointRedemption.create(
      [
        {
          userId,
          itemId,
          pointsUsed: item.pointsCost,
          status: "pending",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Redemption initiated successfully. Points deducted.",
      redemption: redemption[0],
      userPointsBalance: user.pointsBalance,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error initiating redemption:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const completeRedemption = async (req: Request, res: Response) => {
  const redemptionId = req.params.id;
  const currentUserId = req.user!.id;
  const currentUserIsAdmin = req.user!.isAdmin;

  console.log("--- Starting completeRedemption function ---");
  console.log("Request Redemption ID:", redemptionId);
  console.log("Current User ID:", currentUserId);
  console.log("Current User is Admin:", currentUserIsAdmin);

  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("MongoDB session started and transaction initiated.");

  try {
    const redemption = await PointRedemption.findById(redemptionId)
      .session(session)
      .populate("userId", "fullName")
      .populate("itemId", "title userId");

    console.log("Fetched redemption:", redemption);

    if (!redemption) {
      await session.abortTransaction();
      session.endSession();
      console.log("Redemption record not found. Aborting transaction.");
      return res.status(404).json({ message: "Redemption record not found" });
    }

    console.log("Redemption status:", redemption.status);
    if (redemption.status !== "pending") {
      await session.abortTransaction();
      session.endSession();
      console.log("Redemption is not pending. Aborting transaction.");
      return res.status(400).json({
        message: `Redemption is not pending. Current status: ${redemption.status}`,
      });
    }

    const redeemedItem = redemption.itemId as ItemDocument;

    console.log(
      "Redemption User ID (from redemption object):",
      (redemption.userId as UserDocument).id
    );
    console.log("Redeemed Item ID:", redeemedItem._id);
    console.log("Redeemed Item Title:", redeemedItem.title);
    console.log("Redeemed Item Owner ID:", redeemedItem.userId);

    if (
      (redemption.userId as UserDocument).id !== currentUserId &&
      !currentUserIsAdmin
    ) {
      await session.abortTransaction();
      session.endSession();
      console.log(
        "Unauthorized attempt to complete redemption. Aborting transaction."
      );
      return res
        .status(403)
        .json({ message: "Not authorized to complete this redemption" });
    }

    const itemOwner = await User.findById(redeemedItem.userId).session(session);
    console.log("Fetched item owner:", itemOwner);

    if (!itemOwner) {
      await session.abortTransaction();
      session.endSession();
      console.log("Item owner not found. Aborting transaction.");
      return res.status(404).json({ message: "Item owner not found" });
    }

    console.log("Updating redemption status to 'completed'.");
    redemption.status = "completed";
    await redemption.save({ session });
    console.log("Redemption status updated.");

    console.log("Updating item status to 'redeemed'.");
    await Item.findByIdAndUpdate(
      redemption.itemId,
      { status: "redeemed" },
      { session }
    );
    console.log("Item status updated.");

    const POINTS_EARNED_BY_OWNER = redemption.pointsUsed;
    console.log("Points earned by owner:", POINTS_EARNED_BY_OWNER);
    console.log(
      "Item owner's current points balance:",
      itemOwner.pointsBalance
    );

    itemOwner.pointsBalance += POINTS_EARNED_BY_OWNER;
    await itemOwner.save({ session });
    console.log("Item owner's new points balance:", itemOwner.pointsBalance);

    // TODO: Log transaction for item owner (points earned)
    // TODO: Notify item owner that their item has been redeemed/sold

    await session.commitTransaction();
    session.endSession();
    console.log("Transaction committed and session ended successfully.");

    res.json({ message: "Redemption completed successfully", redemption });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error completing redemption:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  } finally {
    console.log("--- Exiting completeRedemption function ---");
  }
};

export const cancelRedemption = async (req: Request, res: Response) => {
  const redemptionId = req.params.id;
  const currentUserId = req.user!.id;
  const currentUserIsAdmin = req.user!.isAdmin;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const redemption = await PointRedemption.findById(redemptionId)
      .session(session)
      .populate("userId", "pointsBalance");

    if (!redemption) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Redemption record not found" });
    }

    if (redemption.status !== "pending") {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: `Redemption is not pending. Current status: ${redemption.status}`,
      });
    }

    if (redemption.userId.id !== currentUserId && !currentUserIsAdmin) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this redemption" });
    }

    redemption.status = "cancelled";
    await redemption.save({ session });

    const redeemingUser = redemption.userId as UserDocument;
    redeemingUser.pointsBalance += redemption.pointsUsed;
    await redeemingUser.save({ session });

    await Item.findByIdAndUpdate(
      redemption.itemId,
      { status: "available" },
      { session }
    );

    // TODO: Notify item owner if their item was involved in a cancelled redemption (if applicable)

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Redemption cancelled and points refunded successfully",
      redemption,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error canceling redemption:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
