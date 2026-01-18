import { IUserModel } from "../../model/user.model";

export interface IUserRepository{
    createUser(userData:IUser):Promise<IUserModel>
    findUserByEmail(email:string):Promise<IUserModel|null>
}