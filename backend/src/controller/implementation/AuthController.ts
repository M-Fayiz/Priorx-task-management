import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/IAuthController";
import { IAuthService } from "../../service/interface/IAuthService";
import { successResponse } from "../../util/successResponse.util";
import { clearCookies, setAccessToken, setRefreshToken } from "../../util/cookies.util";

export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { email, password, name } = req.body;

    const responseEmail: string = await this._authService.createUser(
      name,
      email,
      password,
    );

    successResponse(res, { responseEmail });
  };
  verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { token, email } = req.body;

    const { accessToken, refreshToken } = await this._authService.verifyEmail(
      email,
      token,
    );

    setAccessToken(res, accessToken);
    setRefreshToken(res, refreshToken);

    successResponse(res, { accessToken });
  };

  authME = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { accessToken } = req.cookies;

    const user = await this._authService.authME(accessToken);

    successResponse(res, { user });
  };
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { refreshToken } = req.cookies;
    console.log('get into ➡️')
    const { accessToken } = await this._authService.refreshToken(refreshToken);

    setAccessToken(res, accessToken);

    successResponse(res, { accessToken });
  };
  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await this._authService.login(
      email,
      password,
    );

    setAccessToken(res, accessToken);
    setRefreshToken(res, refreshToken);

    successResponse(res, { accessToken });
  };
  logout=async(req: Request, res: Response, next: NextFunction): Promise<void>=> {

      clearCookies(res)

      successResponse(res,{logout:true})
  }
}
