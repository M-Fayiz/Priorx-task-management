import express from "express";
import cors from "cors";
import morgan from "morgan";
import corsConfig from "./config/cors.config";
import http from 'http'
import { errorHandler } from "./middleware/errorHandler.middleware";
import authRouter from "./router/auth.router";
import { intitializeSocket } from "./socket/index.socket";
import taskRouter from "./router/task.router";
import cookieParser from "cookie-parser";
import envConfig from "./config/env.config";
export const app = express();

/* -------------------- Core Middlewares -------------------- */
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

 export const server = http.createServer(app)
intitializeSocket(server);

app.use((req, res, next) => {
  console.log("REQ ORIGIN:", req.headers.origin);
  console.log("ALLOWED ORIGIN:", envConfig.CLIENT_URL);
  next();
});

/* -------------------- Routes -------------------- */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

/* -------------------- Global Error Handler  -------------------- */
app.use(errorHandler);
