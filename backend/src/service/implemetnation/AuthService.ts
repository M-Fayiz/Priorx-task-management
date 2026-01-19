import redisClient from "../../config/redis.config";
import { HttpResponse } from "../../constant/errorResonponst.constant";
import { HttpStatus } from "../../constant/httpStatusCode.const";
import { redisConstant } from "../../constant/redis.const";
import { payloadDTO } from "../../mapper/payload.dto";
import { userDTO } from "../../mapper/user.dto";
import { IUserRepository } from "../../repository/interface/IUserRepository";
import { IUserDTO } from "../../types/mapper-types/user.dot.types";
import { IUser } from "../../types/user.types";
import { createHttpError } from "../../util/appErrors";
import { comparePassword, hashPassword } from "../../util/bcrypt.util";
import { generateTokens, verifyAccesToken, verifyRefreshToken } from "../../util/jwt-token-generation.util";
import { sendToken } from "../../util/send-mail.util";
import { IAuthService } from "../interface/IAuthService";
import { v4 as uuidv4 } from "uuid";



export class AuthService implements IAuthService{
    
    constructor(private _userRepository:IUserRepository){}

    /**
     * Creates a new user registration request and sends a verification token to the user's email.
     * 
     * @param name - The name of the user
     * @param email - The user's email address
     * @param password - The user's plain text password
     * @returns  The email address to which the verification token was sent 
     */
    async createUser(name: string, email: string, password: string): Promise<string> {
        
        const isUserExist=await this._userRepository.findUserByEmail(email)
     
        if(isUserExist){
            throw createHttpError(HttpStatus.CONFLICT,HttpResponse.USER_EXIST)
        }

        password = await hashPassword(password as string);

        const token = uuidv4();

        await sendToken(email,token)

        const key=`${redisConstant.VERIFY_EMAIL}:${token}`

        await redisClient.setEx(key,3500,JSON.stringify({name,email,password}))

        return email
    }
    /**
     * 
     * @param email - The user's email address
     * @param token - The email verification token
     * @returns An object containing access and refresh tokens
     */
    async verifyEmail(email: string, token: string): Promise<{accessToken:string,refreshToken:string}> {

        const key=`${redisConstant.VERIFY_EMAIL}:${token}`
        
        const cacheData=await redisClient.get(key)

        if(!cacheData){
            throw createHttpError(HttpStatus.UNAUTHORIZED,HttpResponse.USER_CREATION_FAILED)
        }

        const storedData = JSON.parse(cacheData)

        const userData:IUser={
            name:storedData.name,
            email:storedData.email,
            password:storedData.password
        }

        const createdUser=await this._userRepository.createUser(userData)

        await redisClient.del(key)

        return generateTokens(payloadDTO(createdUser._id,createdUser.email))

    }
    async authME(accessToken: string): Promise<IUserDTO> {
        
        const decoded=verifyAccesToken(accessToken)

        if (!decoded) {
            throw createHttpError(
                HttpStatus.UNAUTHORIZED,
                HttpResponse.ACCESS_TOKEN_EXPIRED,
            );
        }

        const user = await this._userRepository.findUser({_id:decoded._id})

        if(!user){
            throw createHttpError(HttpStatus.NOT_FOUND,HttpResponse.USER_NOT_FOUND)
        }

        return userDTO(user)
    }
    async refreshToken(refreshToken: string): Promise<{ accessToken: string; }> {
        
        if(!refreshToken){
            throw createHttpError(HttpStatus.LOCKED,HttpResponse.UNAUTHORIZED)
        }
        const decoded= verifyRefreshToken(refreshToken)

        if(!decoded){
            throw createHttpError(HttpStatus.LOCKED,HttpResponse.UNAUTHORIZED)
        }

        const user = await this._userRepository.findUser({_id:decoded._id})

        if(!user){
            throw createHttpError(HttpStatus.NOT_FOUND,HttpResponse.USER_NOT_FOUND)
        }
        const payload = payloadDTO(user._id,user.email);
        const {accessToken}= generateTokens(payload)
        return {accessToken}
    }
    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; }> {
        
        const user= await this._userRepository.findUserByEmail(email)

        if(!user){
            throw createHttpError(HttpStatus.NOT_FOUND,HttpResponse.USER_NOT_FOUND)
        }

        const isMatch= await comparePassword(password,user.password)

        if(!isMatch){
            throw createHttpError(HttpStatus.CONFLICT,HttpResponse.INVALID_CREDNTIALS)
        }
        const payload=payloadDTO(user._id,user.email)
        return generateTokens(payload)
    }
}