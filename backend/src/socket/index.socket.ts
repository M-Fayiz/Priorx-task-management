import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import envConfig from "../config/env.config";
import redisClient from "../config/redis.config";
import { HttpResponse } from "../constant/errorResonponst.constant";
import { verifyAccesToken } from "../util/jwt-token-generation.util";
import { SocketEvents } from "../constant/socketEvents.constant";

interface CustomSocket extends Socket {
  data: { userId: string };
}

export let io: Server;

export const intitializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: envConfig.CLIENT_URL as string,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.use((socket: CustomSocket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error(HttpResponse.UNAUTHORIZED));
    try {
      const user = verifyAccesToken(token);

      socket.data.userId = user._id;
      socket.join(user._id);
      next();
    } catch {
      next(new Error(HttpResponse.UNAUTHORIZED));
    }
  });

  io.on(SocketEvents.CONNECT, async (socket: CustomSocket) => {
    const userId = socket.data.userId;

    console.log("socket connected :", userId);
  });

  return io;
};
