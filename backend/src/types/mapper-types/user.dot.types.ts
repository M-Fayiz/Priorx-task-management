import { Types } from "mongoose";

export interface IUserDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
}
