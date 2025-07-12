import express, { Request, Response } from "express";

const app = express();

app.post("/signin", (req: Request, res: Response) => {});
app.post("/signup", (req: Request, res: Response) => {});
app.get("/me", (req: Request, res: Response) => {});

export default app;
