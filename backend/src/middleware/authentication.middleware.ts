import { Request, Response, NextFunction } from "express";
import { UserModel } from "../model/user.model"; 
import { createHttpError } from "../util/appErrors"; 
import { HttpStatus } from "../constant/httpStatusCode.const"; 
import { HttpResponse } from "../constant/errorResonponst.constant"; 
import { verifyAccesToken } from "../util/jwt-token-generation.util"; 
import jwt from "jsonwebtoken";


export async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
   
      throw createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.UNAUTHORIZED);
    }
    console.log('access token :',accessToken)
    const decode = verifyAccesToken(accessToken);

    const userId = decode.sub;
    if (!decode) {
      console.log("access token expired ");
      throw createHttpError(
        HttpStatus.UNAUTHORIZED,
        HttpResponse.ACCESS_TOKEN_EXPIRED,
      );
    }
   
    const user = await UserModel.findById(userId).select(
      "_id email",
    );

    if (!user){
      throw createHttpError(HttpStatus.NOT_FOUND, HttpResponse.USER_NOT_FOUND);
    }
    
    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        createHttpError(
          HttpStatus.UNAUTHORIZED,
          HttpResponse.ACCESS_TOKEN_EXPIRED,
        ),
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        createHttpError(HttpStatus.UNAUTHORIZED, HttpResponse.UNAUTHORIZED),
      );
    }

    next(error);
  }
}
