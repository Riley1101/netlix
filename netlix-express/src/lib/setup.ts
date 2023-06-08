import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { router } from "../routes/health_check";
import { movieRouter } from "../routes/movies";
import { uploadRouter } from "../routes/upload";
import { chatRouter } from "../routes/chat";
import { websocket } from "./websockets";

function setup_env(): void {
  dotenv.config();
}

export function setup_express() {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use("/public", express.static("public"));
  app.use(router);
  app.use(movieRouter);
  app.use(uploadRouter);
  app.use(chatRouter);
  return app;
}

export function init(): void {
  setup_env();
  const app = setup_express();
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
  websocket(server);
}
