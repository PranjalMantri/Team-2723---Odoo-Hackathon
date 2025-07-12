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

  const userResponse = {
    id: user._id,
    email: user.email,
    fullName: user.fullName,
  };

  return res.status(200).json({ user: userResponse });
};

export { signup, signin, me };
