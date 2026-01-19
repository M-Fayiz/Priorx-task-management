import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import envConfig from "../config/env.config";
import { HttpResponse } from "../constant/errorResonponst.constant";
import { verifyAccesToken } from "../util/jwt-token-generation.util";
import { SocketEvents } from "../constant/socketEvents.constant";
import cookie from "cookie";

interface CustomSocket extends Socket {
  data: { userId: string };
}

export let io: Server;

export const intitializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: envConfig.CLIENT_URL as string,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.use((socket: CustomSocket, next) => {
  try {
     const token = socket.handshake.auth?.token;
    

    console.log('token :',token)
    if (!token) {
      return next(new Error(HttpResponse.UNAUTHORIZED));
    }

    const user = verifyAccesToken(token);
    console.log('user :',user)
    socket.data.userId = user.sub as string;
    socket.join(socket.data.userId);

    next();
  } catch (error) {
    next(new Error(HttpResponse.UNAUTHORIZED));
  }
});

  io.on(SocketEvents.CONNECT, async (socket: CustomSocket) => {
    const userId = socket.data.userId;

    console.log("socket connected :", userId);
  });

  return io;
};
