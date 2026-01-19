import { Document, Types, Schema, model } from "mongoose";
import { ITask } from "../types/task.types";
import { ModelName } from "../constant/model.constant";
import { TaskStatus } from "../constant/task.constant";

export interface ITaskModel extends ITask, Document<Types.ObjectId> {}

const taskSchema = new Schema<ITaskModel>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    dueDate: { type: Date },
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.USER,
      required: true,
    },
  },
  { timestamps: true },
);

export const TaskModel = model<ITaskModel>(ModelName.TASK, taskSchema);
