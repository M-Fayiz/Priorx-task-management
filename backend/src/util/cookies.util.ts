import { Response } from "express";
import { AUTH_TOKEN } from "../constant/authToken.const";

export const setAccessToken = (res: Response, token: string) => {
  res.cookie(AUTH_TOKEN.ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 15 * 60 * 1000,
    path: "/",
  });
};

export const setRefreshToken = (res: Response, token: string) => {
  res.cookie(AUTH_TOKEN.REFRESH_TOKEN, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};


export const clearCookies = (res: Response) => {
  const options = {
    httpOnly: true,
     secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? ("none" as const)
        : ("lax" as const),
    domain: undefined,
    path: "/",
  };

  res.clearCookie(AUTH_TOKEN.ACCESS_TOKEN, options);
  res.clearCookie(AUTH_TOKEN.REFRESH_TOKEN, options);
};
