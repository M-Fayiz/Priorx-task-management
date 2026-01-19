import { Types } from "mongoose";
import { ITaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";

export interface ITaskRepository {
  createTask(taskData: ITask): Promise<ITaskModel>;
  updateTask(
    taskId: Types.ObjectId,
    data: Partial<ITask>,
  ): Promise<ITaskModel | null>;
  deleteTask(taskId: Types.ObjectId): Promise<ITaskModel | null>;
  getTasks(userId:Types.ObjectId):Promise<ITaskModel[]|null>
}
