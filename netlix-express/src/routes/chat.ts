import { Router } from "express";
import ws from "ws";

const router = Router();

router.get("/chat/:id", (req, res) => {
  res.json({ title: "Chat" });
});

export { router as chatRouter };
