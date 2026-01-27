
import { Request, Response, NextFunction } from "express";
import { backendSignupSchema } from "../schema/authSchema";
import { createHttpError } from "../util/appErrors";
import { HttpStatus } from "../constant/httpStatusCode.const";
import { HttpResponse } from "../constant/errorResonponst.constant";

export function authInputValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = backendSignupSchema.safeParse(req.body);

  if (!result.success) {
    const errors: Record<string, string> = {};

    result.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      errors[field] = err.message;
    });

     throw createHttpError(HttpStatus.BAD_REQUEST,HttpResponse.PLEASE_FILLOUT)
  }

  req.body = result.data;

  next();
}
