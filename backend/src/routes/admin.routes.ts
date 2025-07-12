import { Router } from "express";
import {
  getReviewItems,
  approveItem,
  rejectItem,
} from "../controller/admin.controller.ts";
import authMiddleware, {
  authorizeAdmin,
} from "../middleware/authMiddleware.ts";

const router = Router();

router.use(authMiddleware);
router.use(authorizeAdmin);

router.get("/items/in-review", getReviewItems);
router.put("/items/:id/approve", approveItem);
router.put("/items/:id/reject", rejectItem);

export default router;
