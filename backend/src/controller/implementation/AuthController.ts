import { Request, Response, NextFunction } from "express";
import { IAuthController } from "../interface/IAuthController";
import { IAuthService } from "../../service/interface/IAuthService";
import { successResponse } from "../../util/successResponse.util";
import { setAccessToken, setRefreshToken } from "../../util/cookies.util";


export class AuthController implements IAuthController{

    constructor(private _authService:IAuthService){}

    signup=async (req: Request, res: Response, next: NextFunction): Promise<void>=> {

        const {email,password,name}=req.body

        const responseEmail:string=await this._authService.createUser(name,email,password)
        
        successResponse(res,{responseEmail})
    }
    verifyEmail=async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
        
        const {token,email}=req.body

        const {accessToken,refreshToken}=await this._authService.verifyEmail(email,token)

        setAccessToken(res,accessToken)
        setRefreshToken(res,refreshToken)
        
        successResponse(res,{accessToken})
    }
}