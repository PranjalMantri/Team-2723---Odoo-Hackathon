import { Router } from "express";
import { signup, signin, me } from "../controller/user.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/me", authMiddleware, me);

export default router;
