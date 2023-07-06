import { Router, Request, Response } from "express";
import ffmpeg from "fluent-ffmpeg";
import ffmpeg_installer from "@ffmpeg-installer/ffmpeg";
import workerpool from "workerpool";
ffmpeg.setFfmpegPath(ffmpeg_installer.path);
const pool = workerpool.pool(__dirname+'/worker.mjs')

export const threadRouter = Router();

threadRouter.get("/process_video/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    if (id) {
        const path = "public/static/" + id;
        pool.exec('process_video', [path,id])
        res.status(200).send("OK");
    } else {
        res.status(400).send("Bad Request");
    }
});

threadRouter.get('/process_stats/',(req:Request,res:Response)=>{
    res.status(200).send(pool.stats())
})
