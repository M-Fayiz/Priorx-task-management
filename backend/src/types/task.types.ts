import { Types } from "mongoose";

export interface ITask {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: Date;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
