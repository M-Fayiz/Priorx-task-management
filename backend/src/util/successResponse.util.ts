import { Response } from "express";
import { HttpResponse } from "../constant/errorResonponst.constant";
import { HttpStatus } from "../constant/httpStatusCode.const";

export const successResponse=<T extends object>(res:Response,data:T)=>{
  res.status(HttpStatus.OK).json({success:true,message:HttpResponse.OK,...data})
}
