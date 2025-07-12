import { Router, Request, Response } from "express";
import { createItem, getAllItems } from "../controller/item.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";
import { upload } from "../middleware/multer.ts";

const router = Router();

router.get("/", getAllItems);
router.get("/:id", (req: Request, res: Response) => {});
router.put("/:id", (req: Request, res: Response) => {});
router.delete("/:id", (req: Request, res: Response) => {});

router.get("/my-items", (req: Request, res: Response) => {});
router.post("/", authMiddleware, upload.array("images", 5), createItem);

export default router;
