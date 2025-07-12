import express, { Request, Response } from "express";
import { signup } from "../controller/user.controller.ts";

const app = express();

app.post("/signin", (req: Request, res: Response) => {});
app.post("/signup", signup);
app.get("/me", (req: Request, res: Response) => {});

export default app;
