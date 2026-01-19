import { Types } from "mongoose";
import { TaskStatus } from "../constant/task.constant";

export interface ITask extends IBaseTaskField {
  userId: Types.ObjectId;
}
export interface ITaskFromClient extends IBaseTaskField {
  userId: string;
}

export interface IBaseTaskField {
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
