import { Router } from "express";
import {
  signup,
  signin,
  me,
  getUserSwapCount,
} from "../controller/user.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/me", authMiddleware, me);

router.get("/me/swap-count", authMiddleware, getUserSwapCount);

export default router;
