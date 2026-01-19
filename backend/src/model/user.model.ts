import mongoose, { Document, Types } from "mongoose";
import { ModelName } from "../constant/model.constant";
import { IUser } from "../types/user.types";

export interface IUserModel extends IUser, Document<Types.ObjectId> {}

const UserSchema = new mongoose.Schema<IUserModel>({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<IUserModel>(ModelName.USER, UserSchema);
