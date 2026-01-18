import { NextFunction, Request, Response } from "express";


export interface IAuthController{
    signup(req:Request,res:Response,next:NextFunction):Promise<void>
    verifyEmail(req:Request,res:Response,next:NextFunction):Promise<void>
}