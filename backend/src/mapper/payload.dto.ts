import { Types } from "mongoose";
import { IAccessPayloadDTO } from "../types/mapper-types/payload.types";

export function payloadDTO(_id:Types.ObjectId,email:string):IAccessPayloadDTO{
    return{
        sub:_id,
        email
    }
}