import { IUserModel } from "../../model/user.model";

export interface IAuthService{
    createUser(name:string,email:string,password:string):Promise<string>
    verifyEmail(email:string,token:string):Promise<{accessToken:string,refreshToken:string}>
}