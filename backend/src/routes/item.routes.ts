import { Router, Request, Response } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
  getUserItems,
} from "../controller/item.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";
import { upload } from "../middleware/multer.ts";

const router = Router();

router.get("/", getAllItems);
router.get("/my-items", authMiddleware, getUserItems);
router.post("/", authMiddleware, upload.array("images", 5), createItem);

router.get("/:id", getItemById);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

export default router;
