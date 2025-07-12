import User from "../models/user.model.ts";
import { signupSchema } from "../schema/user.schema.ts";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

const signup = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  const validateUser = signupSchema.safeParse(req.body);

  if (!validateUser.success) {
    return res
      .status(400)
      .json({ errors: validateUser.error.flatten().fieldErrors });
  }

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_FACTOR)
  );

  const user = await User.create({
    email,
    password: hashedPassword,
    fullName,
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

export { signup };
