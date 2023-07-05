import fs from "fs";
import { Request, Response, Router } from "express";
import type { MovieFile } from "../types";
import { ObjectId } from "mongodb";
import multer from "multer";
import { db } from "../models/db";

const router = Router();
const upload = multer({ dest: "public/static/", preservePath: true });


router.post(
  "/upload/",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;
    if (!file) return res.json({ err: "file not found" });

    try {
      const save_data = {
        originalname: file?.originalname,
        destination: file?.destination,
        filename: file?.filename,
        path: file?.path,
        size: file?.size,
        mimetype: file?.mimetype,
        type: "movie",
      };
      const movie = await db.collection("files").insertOne(save_data);
      res.json({ ok: file });
    } catch (err) {
      res.json({ err });
    }
  }
);

router.get("/upload/:id", async (req: Request, res: Response) => {
  const params = req.params;
  const id = new ObjectId(params.id);
  try {
    const movie = (await db
      .collection("files")
      .findOne({ _id: id })) as MovieFile;
    const video_path = movie.path;
    const mimetype = movie.mimetype;
    const file_size = movie.size;
    const videoRange = req.headers.range;
    if (videoRange) {
      // specified range
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : file_size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(video_path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${file_size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": mimetype,
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": file_size,
        "Content-Type": mimetype,
      };
      res.writeHead(200, head);
      fs.createReadStream(video_path).pipe(res);
    }
  } catch (err) {
    res.json({ err });
  }
});
export { router as uploadRouter };
