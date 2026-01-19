import { NextFunction, Request, Response } from "express";


export interface ITaskController{
    createTask(req:Request,res:Response,next:NextFunction):Promise<void>
}