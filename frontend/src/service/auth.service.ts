import { axiosInstance } from "../axios/axiosInstance"
import ConstAPI from "../constant/api.const"
import type { User } from "../store/auth.store"
import { throwAxiosError } from "../utils/axiosError.util"

const AuthService={
    register:async(name:string,email:string,password:string):Promise<string>=>{
        try {
            const response=await axiosInstance.post(ConstAPI.AUTH.REGISTER,{
                name,
                email,
                password
            })
            return response.data.responseEmail
        } catch (error) {
            throwAxiosError(error)
        }
    },
    verifyEmail:async(email:string,token:string):Promise<void>=>{
        try {
            const response= await axiosInstance.post(ConstAPI.AUTH.VERIFY_EMAIL,{
                email,
                token
            })
            return response.data
        } catch (error) {
            throwAxiosError(error)
        }
    },
    authME:async():Promise<User>=>{
        try {
            const response= await axiosInstance.get(ConstAPI.AUTH.AUTH_ME)
            return response.data.User

        } catch (error) {
            throwAxiosError(error)
        }
    }

}

export default AuthService