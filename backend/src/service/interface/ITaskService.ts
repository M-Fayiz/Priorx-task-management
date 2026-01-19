import { ITaskModel } from "../../model/task.model";
import { ITask, ITaskFromClient } from "../../types/task.types";

export interface ITaskService {
  createTask(data: ITaskFromClient,
  userIdFromToken: string): Promise<ITaskModel>;
  updateTask(taskId: string, userId: string, data: Partial<ITask>):Promise<ITaskModel>;
  deleteTask(taskId: string, userId: string):Promise<void>;
  getTask(userId:string):Promise<ITaskModel[]>
}
