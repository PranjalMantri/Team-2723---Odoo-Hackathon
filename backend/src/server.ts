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

import authRouter from "./routes/auth.router.ts";
import itemRouter from "./routes/item.routes.ts";

app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectdb();
});
