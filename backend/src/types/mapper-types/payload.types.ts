import { Types } from "mongoose";

export interface IAccessPayloadDTO{
    sub:Types.ObjectId,
    email:string
}