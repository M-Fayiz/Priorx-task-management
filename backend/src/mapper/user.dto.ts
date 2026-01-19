import { IUserModel } from "../model/user.model";
import { IUserDTO } from "../types/mapper-types/user.dot.types";

export function userDTO(user:IUserModel):IUserDTO{
    return{
        _id:user._id,
        name:user.name,
        email:user.email
    }
}