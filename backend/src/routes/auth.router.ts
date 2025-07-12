import express, { Request, Response } from "express";
import { signup, signin } from "../controller/user.controller.ts";

const app = express();

app.post("/signin", signin);
app.post("/signup", signup);
app.get("/me", (req: Request, res: Response) => {});

export default app;
