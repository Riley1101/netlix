import { Router } from "express";

import { db } from "../models/db";

export const router = Router();

router.get("/health_check", (req, res) => {
  res.status(200).send("OK");
});

router.get("/health_check/db", async (req, res) => {
  try {
    await db.collection("test").insertOne({ test: 1 });
    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("NG");
  }
});
