import fs from "fs";
import { Request, Response, Router } from "express";
import type { MovieFile } from "../types";
import { ObjectId } from "mongodb";
import multer from "multer";
import { db } from "../models/db";
import ffmpeg from "fluent-ffmpeg";
import ffmpeg_installer from "@ffmpeg-installer/ffmpeg";

const router = Router();
const upload = multer({ dest: "public/static/", preservePath: true });
ffmpeg.setFfmpegPath(ffmpeg_installer.path);

function process_video(file: Express.Multer.File) {
  const { path, filename } = file;
  ffmpeg(path, { timeout: 432000 })
    .addOptions([
      "-profile:v baseline",
      "-level 3.0",
      "-start_number 0",
      "-hls_time 10",
      "-hls_list_size 0",
      "-f hls",
    ])
    .output(`public/processed/output.m3u8`)
    .on("end", function (res) {
      console.log(res);
    })
    .on("error", function (err) {
      console.log(err);
    })
    .run();
}

router.post(
  "/upload/",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { file } = req;
    if (!file) return res.json({ err: "file not found" });
    process_video(file);

    try {
      /**
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
            */
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
