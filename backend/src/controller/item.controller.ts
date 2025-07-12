import { Request, Response } from "express";
import Item from "../models/item.model.ts";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { createItemSchema } from "../schema/item.schema.ts";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No form data received" });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const parsedBody = {
      ...req.body,
      price: req.body.price ? Number(req.body.price) : undefined,
      tags: req.body.tags
        ? req.body.tags.split(",").map((tag: string) => tag.trim())
        : [],
    };

    const validateData = createItemSchema.safeParse(parsedBody);

    if (!validateData.success) {
      return res
        .status(400)
        .json({ errors: validateData.error.flatten().fieldErrors });
    }

    const imageUrls = (req.files as Express.Multer.File[]).map(
      (file: any) => file.path
    );

    const item = await Item.create({
      userId,
      title: validateData.data.title,
      description: validateData.data.description,
      category: validateData.data.category,
      type: validateData.data.type,
      size: validateData.data.size,
      condition: validateData.data.condition,
      imageUrls,
      tags: validateData.data.tags,
      isApproved: false,
      price: validateData.data.price,
    });

    res.status(201).json({ message: "Item submitted for review", item });
  } catch (error: any) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllItems = async (req: Request, res: Response) => {
  try {
    const {
      category,
      size,
      condition,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = { isApproved: true, status: "available" };

    if (category) query.category = category;
    if (size) query.size = size;
    if (condition) query.condition = condition;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search as string, "i")] } },
      ];
    }

    const items = await Item.find(query)
      .limit(parseInt(limit as string))
      .skip((parseInt(page as string) - 1) * parseInt(limit as string))
      .populate("userId", "fullName profilePictureUrl");

    const totalItems = await Item.countDocuments(query);

    res.json({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      totalItems: totalItems,
      totalPages: Math.ceil(totalItems / parseInt(limit as string)),
      items,
    });
  } catch (error: any) {
    console.error("Error getting all items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { getAllItems, createItem };
