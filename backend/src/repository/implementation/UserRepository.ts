import { QueryFilter } from "mongoose";
import { IUserModel, UserModel } from "../../model/user.model";
import { BaseRepository } from "../baseRepository";
import { IUserRepository } from "../interface/IUserRepository";


export class UserRepository extends BaseRepository<IUserModel> implements IUserRepository{
    constructor(){
        super(UserModel)
    }

    async createUser(userData:IUserModel):Promise<IUserModel>{
        return await this.create(userData)
    }

    async findUserByEmail(email:string):Promise<IUserModel|null>{
        return await this.findOne({email})
    }
    async findUser(filter:QueryFilter<IUserModel>):Promise<IUserModel|null>{
        return await this.findOne(filter)
    }
}