import { IUserModel } from "../../model/user.model";
import { IUserDTO } from "../../types/mapper-types/user.dot.types";

export interface IAuthService{
    createUser(name:string,email:string,password:string):Promise<string>
    verifyEmail(email:string,token:string):Promise<{accessToken:string,refreshToken:string}>
    authME(accessToken:string):Promise<IUserDTO>
    refreshToken(refreshToken:string):Promise<{accessToken:string}>
    login(email:string,password:string):Promise<{accessToken:string,refreshToken:string}>
}