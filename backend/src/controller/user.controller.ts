import Item from "../models/item.model.ts";
import SwapRequest from "../models/swap.model.ts";
import User from "../models/user.model.ts";
import { signinSchema, signupSchema } from "../schema/user.schema.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signup = async (req: Request, res: Response) => {
  const validateUser = signupSchema.safeParse(req.body);

  if (!validateUser.success) {
    return res
      .status(400)
      .json({ errors: validateUser.error.flatten().fieldErrors });
  }

  const existingUser = await User.findOne({
    email: validateUser.data.email,
  });

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  const user = await User.create({
    email: validateUser.data.email,
    password: validateUser.data.password,
    fullName: validateUser.data.fullName,
    profilePicture: "https://avatar.iran.liara.run/public/1",
    pointsBalance: 10,
  });

  if (!user) {
    return res.status(500).json({ error: "Failed to create user" });
  }

  const userResponse = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
  };

  return res.status(201).json({ user: userResponse });
};

const signin = async (req: Request, res: Response) => {
  const validateUser = signinSchema.safeParse(req.body);

  if (!validateUser.success) {
    return res
      .status(400)
      .json({ errors: validateUser.error.flatten().fieldErrors });
  }

  const user = await User.findOne({ email: validateUser.data.email });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await user.comparePassword(
    validateUser.data.password
  );

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const payload = {
    id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3600000,
  });

  const userResponse = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
  };

  return res.status(200).json({ user: userResponse, token });
};

const me = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.email === "pranjalmantri@gmail.com") {
    user.isAdmin = true;
  }

  const userResponse = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
    points: user.pointsBalance,
    isAdmin: user.isAdmin,
    profilePicture: user.profilePicture,
    createdAt: user.createdAt,
  };

  return res.status(200).json({ user: userResponse });
};

const getUserSwapCount = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const userOwnedItems = await Item.find({ userId: userId }).select("_id");
    const userOwnedItemIds = userOwnedItems.map((item) => item._id);

    const swapCount = await SwapRequest.countDocuments({
      $or: [
        { requesterUserId: userId },
        { offeredItemId: { $in: userOwnedItemIds } },
        { requestedItemId: { $in: userOwnedItemIds } },
      ],
      status: { $in: ["accepted", "completed"] },
    });

    res.json({ totalSwaps: swapCount });
  } catch (error: any) {
    console.error("Error getting user swap count:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userResponse = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      points: user.pointsBalance,
      isAdmin: user.isAdmin,
    };

    return res.status(200).json({ user: userResponse });
  } catch (error: any) {
    console.error("Error getting user by ID:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
};

export { signup, signin, me, getUserSwapCount, getUserById };
