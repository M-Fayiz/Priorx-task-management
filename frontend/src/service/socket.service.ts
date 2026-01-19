import { AUTH_TOKEN } from "@/constant/token.const";
import { io } from "socket.io-client";



export const socket = io(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem(AUTH_TOKEN.ACCESS_TOKEN),
  },
});
