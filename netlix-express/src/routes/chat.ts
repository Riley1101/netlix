import { Router } from "express";

const router = Router();

router.get("/chat/:id", (req, res) => {
  res.json({ title: "Chat" });
});

export { router as chatRouter };
