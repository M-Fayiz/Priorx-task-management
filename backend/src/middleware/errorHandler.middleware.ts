import { Request, Response, NextFunction } from "express";
import { HttpError } from "../util/appErrors";
import { HttpStatus } from "../constant/httpStatusCode.const";
import { HttpResponse } from "../constant/errorResonponst.constant";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message: string = HttpResponse.SERVER_ERROR;

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};
