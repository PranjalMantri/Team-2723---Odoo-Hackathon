import { Router } from "express";
import {
  initiateRedemption,
  completeRedemption,
  cancelRedemption,
} from "../controller/redemption.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.use(authMiddleware);

router.post("/", initiateRedemption);

router.put("/:id/complete", completeRedemption);
router.put("/:id/cancel", cancelRedemption);

export default router;
