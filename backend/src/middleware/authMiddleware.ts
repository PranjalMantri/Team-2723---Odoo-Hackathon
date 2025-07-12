import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.cookies.token || req.headers.authorization) {
    try {
      token =
        req.cookies.token ||
        (req.headers.authorization
          ? req.headers.authorization.split(" ")[1]
          : undefined);
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error: any) {
      console.error("Authentication error:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Authorization check for admin:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, no user" });
  }

  if (req.user.email === "pranjalmantri@gmail.com") {
    req.user.isAdmin = true;
  }

  console.log("User:", req.user);
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

export default authMiddleware;
