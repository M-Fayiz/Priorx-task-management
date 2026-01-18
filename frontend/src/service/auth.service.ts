import { throwAxiosError } from "../utils/axiosError.util"

const AuthService={
    register:async(name:string,email:string,password:string):Promise<string>=>{
        try {
            
        } catch (error) {
            throwAxiosError(error)
        }
    }
}

export default AuthService