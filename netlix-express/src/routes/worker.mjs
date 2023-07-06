import ffmpeg from "fluent-ffmpeg";
import ffmpeg_installer from "@ffmpeg-installer/ffmpeg";
import workerpool from "workerpool";
import fs from "fs";
ffmpeg.setFfmpegPath(ffmpeg_installer.path);

function process_video(path, id) {
  const dir = `public/processed/${id}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const output = `public/processed/${id}/output.m3u8`;
  new Promise((res, rej) => {
    ffmpeg(path)
      .addOptions([
        "-profile:v baseline",
        "-level 3.0",
        "-start_number 0",
        "-hls_time 10",
        "-hls_list_size 0",
        "-f hls",
      ])
      .output(output)
      .on("end", function (res) {
        console.log(res);
      })
      .on("error", function (err) {
        console.log(err);
      })
      .run();
  });
}
workerpool.worker({
  process_video: process_video,
});
