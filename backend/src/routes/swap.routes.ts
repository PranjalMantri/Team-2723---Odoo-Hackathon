import { Router } from "express";
import {
  createSwapRequest,
  getUserSwaps,
  acceptSwapRequest,
  rejectSwapRequest,
  cancelSwapRequest,
  completeSwap,
} from "../controller/swap.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.use(authMiddleware);

router.post("/request", createSwapRequest);

router.get("/me", getUserSwaps);

router.put("/:id/accept", acceptSwapRequest);
router.put("/:id/reject", rejectSwapRequest);
router.put("/:id/cancel", cancelSwapRequest);
router.put("/:id/complete", completeSwap);

export default router;
