import cors from "cors";
import express, { Express } from "express";
import { router } from "../routes/health_check";
import { movieRouter } from "../routes/movies";
import { uploadRouter } from "../routes/upload";
import { chatRouter } from "../routes/chat";
import { websocket } from "./websockets";
import { logger } from "./logger";

function setup_env(): void {}

export function setup_express() {
  const app: Express = express();
  console.log("Setting up express");
  app.use(cors());
  app.use((req, res, next) => {
    // Log an info message for each incoming request
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
  });
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
