import { Router, Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";
import ffmpeg_installer from "@ffmpeg-installer/ffmpeg";

ffmpeg.setFfmpegPath(ffmpeg_installer.path);

const workerpool = require('workerpool');
function complicatedTask(params:any) {
    console.log("Running complicated task")
    setTimeout(() => {
        console.log("Done")
    },3000)
}

// create a worker pool using an external worker script
const pool = workerpool.pool();

// run registered functions on the worker via exec
 
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

export const threadRouter = Router();

threadRouter.get("/process_video", (req: Request, res: Response) => {
    pool.exec(complicatedTask)
  res.status(200).send("OK");
});
