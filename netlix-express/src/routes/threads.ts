import { Router, Request, Response } from "express";

export const threadRouter = Router();


threadRouter.get("/threads", (req:Request, res:Response) => {
  console.log("GET /threads", res);
  res.status(200).send("OK");
});
