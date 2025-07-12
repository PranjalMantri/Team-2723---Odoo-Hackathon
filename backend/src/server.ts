import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./db/connectDb.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

import authRouter from "./routes/auth.routes.ts";
import itemRouter from "./routes/item.routes.ts";
import swapRouter from "./routes/swap.routes.ts";
import redemptionRouter from "./routes/redemption.routes.ts";
import adminRouter from "./routes/admin.routes.ts";

app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/swaps", swapRouter);
app.use("/api/redemptions", redemptionRouter);
app.use("/api/admin", adminRouter);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectdb();
});
