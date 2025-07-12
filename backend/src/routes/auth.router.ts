import express, { Request, Response } from "express";
import { signup, signin, me } from "../controller/user.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const app = express();

app.post("/signin", signin);
app.post("/signup", signup);
app.get("/me", authMiddleware, me);

export default app;
