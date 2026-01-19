import { NextFunction, Request, Response } from "express";

export interface IAuthController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
  authME(req: Request, res: Response, next: NextFunction): Promise<void>;
  refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
