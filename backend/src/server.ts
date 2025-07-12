import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectdb from "./db/connectDb.ts";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectdb();
});
