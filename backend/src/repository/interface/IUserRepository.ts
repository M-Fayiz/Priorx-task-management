import { QueryFilter } from "mongoose";
import { IUserModel } from "../../model/user.model";
import { IUser } from "../../types/user.types";

export interface IUserRepository {
  createUser(userData: IUser): Promise<IUserModel>;
  findUserByEmail(email: string): Promise<IUserModel | null>;
  findUser(filter: QueryFilter<IUserModel>): Promise<IUserModel | null>;
}
