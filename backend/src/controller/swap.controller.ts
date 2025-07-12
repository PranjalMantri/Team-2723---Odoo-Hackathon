import { Request, Response } from "express";
import Item, { ItemDocument } from "../models/item.model.ts";
import SwapRequest, { SwapDocument } from "../models/swap.model.ts";
import User, { UserDocument } from "../models/user.model.ts";
import mongoose from "mongoose";

export const createSwapRequest = async (req: Request, res: Response) => {
  const { offeredItemId, requestedItemId, message } = req.body;
  const requesterUserId = req.user!.id;

  if (!offeredItemId || !requestedItemId) {
    return res
      .status(400)
      .json({ message: "Please provide both offered and requested item IDs" });
  }

  try {
    const offeredItem = await Item.findById(offeredItemId);
    const requestedItem = await Item.findById(requestedItemId);

    if (!offeredItem || !requestedItem) {
      return res.status(404).json({ message: "One or both items not found" });
    }

    if (offeredItem.userId.toString() !== requesterUserId) {
      return res
        .status(403)
        .json({ message: "You can only offer your own items for swap" });
    }

    if (
      offeredItem.status !== "available" ||
      requestedItem.status !== "available"
    ) {
      return res
        .status(400)
        .json({ message: "One or both items are not available for swap" });
    }

    if (requestedItem.listingType !== "swap") {
      return res
        .status(400)
        .json({ message: "The requested item is not listed for swap" });
    }

    if (offeredItem.userId.toString() === requestedItem.userId.toString()) {
      return res
        .status(400)
        .json({ message: "Cannot swap with your own item" });
    }

    const existingSwap = await SwapRequest.findOne({
      requesterUserId: requesterUserId,
      offeredItemId: offeredItemId,
      requestedItemId: requestedItemId,
      status: { $in: ["pending", "accepted"] },
    });
    if (existingSwap) {
      return res.status(400).json({
        message: "An active swap request already exists for these items",
      });
    }

    const swapRequest = await SwapRequest.create({
      requesterUserId,
      offeredItemId,
      requestedItemId,
      message,
      status: "pending",
    });

    offeredItem.status = "pending_swap";
    requestedItem.status = "pending_swap";
    await offeredItem.save();
    await requestedItem.save();

    // TODO: Implement notification to the owner of requestedItem (e.g., email or in-app)

    res
      .status(201)
      .json({ message: "Swap request sent successfully", swapRequest });
  } catch (error: any) {
    console.error("Error creating swap request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserSwaps = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const swapsAsRequester = await SwapRequest.find({ requesterUserId: userId })
      .populate("offeredItemId", "title imageUrls")
      .populate("requestedItemId", "title imageUrls userId")
      .populate("requesterUserId", "fullName profilePictureUrl");

    const userOwnedItems = await Item.find({ userId: userId }).select("_id");
    const userOwnedItemIds = userOwnedItems.map((item) => item._id);

    const swapsInvolvingMyItems = await SwapRequest.find({
      status: { $ne: "pending" },
      requesterUserId: { $ne: userId },
      $or: [
        { offeredItemId: { $in: userOwnedItemIds } },
        { requestedItemId: { $in: userOwnedItemIds } },
      ],
    })
      .populate("offeredItemId", "title imageUrls")
      .populate("requestedItemId", "title imageUrls userId")
      .populate("requesterUserId", "fullName profilePictureUrl");

    const combinedSwaps = [...swapsAsRequester, ...swapsInvolvingMyItems];

    combinedSwaps.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json(combinedSwaps);
  } catch (error: any) {
    console.error("Error getting user swaps:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const acceptSwapRequest = async (req: Request, res: Response) => {
  const swapRequestId = req.params.id;
  const currentUserId = req.user!.id;

  try {
    const swapRequest = (await SwapRequest.findById(swapRequestId).populate(
      "requestedItemId",
      "userId status"
    )) as SwapDocument & { requestedItemId: ItemDocument };

    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }
    if (swapRequest.status !== "pending") {
      return res.status(400).json({ message: "Swap request is not pending" });
    }

    if (swapRequest.requestedItemId.userId.toString() !== currentUserId) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this swap request" });
    }

    swapRequest.status = "accepted";
    await swapRequest.save();

    // TODO: Notify requester that their swap request has been accepted

    res.json({ message: "Swap request accepted successfully", swapRequest });
  } catch (error: any) {
    console.error("Error accepting swap request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rejectSwapRequest = async (req: Request, res: Response) => {
  const swapRequestId = req.params.id;
  const currentUserId = req.user!.id;

  try {
    const swapRequest = (await SwapRequest.findById(swapRequestId).populate(
      "requestedItemId",
      "userId"
    )) as SwapDocument & { requestedItemId: ItemDocument };

    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }
    if (swapRequest.status !== "pending") {
      return res.status(400).json({ message: "Swap request is not pending" });
    }

    if (swapRequest.requestedItemId.userId.toString() !== currentUserId) {
      return res
        .status(403)
        .json({ message: "Not authorized to reject this swap request" });
    }

    swapRequest.status = "rejected";
    await swapRequest.save();

    await Item.findByIdAndUpdate(swapRequest.offeredItemId, {
      status: "available",
    });
    await Item.findByIdAndUpdate(swapRequest.requestedItemId, {
      status: "available",
    });

    // TODO: Notify requester that their swap request has been rejected

    res.json({ message: "Swap request rejected successfully", swapRequest });
  } catch (error: any) {
    console.error("Error rejecting swap request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const cancelSwapRequest = async (req: Request, res: Response) => {
  const swapRequestId = req.params.id;
  const currentUserId = req.user!.id;

  try {
    const swapRequest = await SwapRequest.findById(swapRequestId)
      .populate("requestedItemId", "userId")
      .populate("offeredItemId", "userId");

    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    const isRequester =
      swapRequest.requesterUserId.toString() === currentUserId;
    const isRecipient =
      (swapRequest.requestedItemId as ItemDocument).userId.toString() ===
      currentUserId;

    if (!isRequester && !isRecipient) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this swap request" });
    }

    if (!["pending", "accepted"].includes(swapRequest.status)) {
      return res.status(400).json({
        message: `Cannot cancel a swap request with status '${swapRequest.status}'`,
      });
    }

    swapRequest.status = "cancelled";
    await swapRequest.save();

    await Item.findByIdAndUpdate(swapRequest.offeredItemId, {
      status: "available",
    });
    await Item.findByIdAndUpdate(swapRequest.requestedItemId, {
      status: "available",
    });

    // TODO: Notify relevant parties about cancellation

    res.json({ message: "Swap request cancelled successfully", swapRequest });
  } catch (error: any) {
    console.error("Error canceling swap request:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const completeSwap = async (req: Request, res: Response) => {
  const swapRequestId = req.params.id;
  const currentUserId = req.user!.id;
  const currentUserIsAdmin = req.user!.isAdmin;

  try {
    const swapRequest = await SwapRequest.findById(swapRequestId)
      .populate("requesterUserId", "pointsBalance fullName")
      .populate("requestedItemId", "userId") // Get owner of requested item
      .populate("offeredItemId", "userId"); // Get owner of offered item

    if (!swapRequest) {
      return res.status(404).json({ message: "Swap request not found" });
    }

    if (swapRequest.status !== "accepted") {
      return res.status(400).json({
        message: `Swap request is not in 'accepted' status. Current: ${swapRequest.status}`,
      });
    }

    // Direct access to populated requester user data
    // Type casting is necessary here because Mongoose's populate returns a Document,
    // and the interface `SwapRequestInput` uses `ObjectId | UserDocument`.
    const requester = swapRequest.requesterUserId as UserDocument;
    const requestedItem = swapRequest.requestedItemId as ItemDocument;
    const offeredItem = swapRequest.offeredItemId as ItemDocument;

    const requestedItemOwner = await User.findById(requestedItem.userId);
    const offeredItemOwner = await User.findById(offeredItem.userId);

    if (!requestedItemOwner || !offeredItemOwner) {
      return res.status(500).json({
        message: "Could not find one of the item owners for points processing.",
      });
    }

    const isAuthorizedToComplete =
      currentUserId === requester._id.toString() || // If current user is the requester
      currentUserId === requestedItemOwner._id.toString(); // If current user is the owner of the requested item (the recipient)

    // Check authorization: either an involved party OR an admin
    if (!isAuthorizedToComplete && !currentUserIsAdmin) {
      return res
        .status(403)
        .json({ message: "Not authorized to complete this swap" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update swap request status
      swapRequest.status = "completed";
      await swapRequest.save({ session });

      // Update item statuses to 'swapped'
      await Item.findByIdAndUpdate(
        swapRequest.offeredItemId,
        {
          status: "swapped",
        },
        { session }
      );
      await Item.findByIdAndUpdate(
        swapRequest.requestedItemId,
        {
          status: "swapped",
        },
        { session }
      );

      const POINTS_FOR_SWAP = 50;

      // Award points to the requester (who offered their item)
      requester.pointsBalance += POINTS_FOR_SWAP;
      await requester.save({ session }); // Use the populated requester object directly

      // Award points to the recipient (owner of the requested item)
      requestedItemOwner.pointsBalance += POINTS_FOR_SWAP;
      await requestedItemOwner.save({ session });

      // TODO: Log transaction for requester
      // TODO: Log transaction for recipient

      await session.commitTransaction(); // Commit all changes if successful
      session.endSession();

      res.json({
        message: "Swap completed successfully! Points awarded.",
        swapRequest,
      });
    } catch (transactionError) {
      await session.abortTransaction(); // Rollback all changes if any error occurs
      session.endSession();
      throw transactionError; // Re-throw to be caught by the outer catch block
    }
  } catch (error: any) {
    console.error("Error completing swap:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
