import { Router } from "express";
import {
  signup,
  signin,
  me,
  getUserSwapCount,
  getUserById,
} from "../controller/user.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/me", authMiddleware, me);
router.get("/me/swap-count", authMiddleware, getUserSwapCount);

router.get("/user/:id", getUserById);

export default router;
