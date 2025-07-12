import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      iat: number;
      exp: number;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired." });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ error: "Invalid token, authorization denied." });
    }
    console.error("Auth middleware error:", err);
    return res
      .status(500)
      .json({ error: "Server error, failed to authenticate token." });
  }
};

export default authMiddleware;
