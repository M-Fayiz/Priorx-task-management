import { QueryFilter, Types } from "mongoose";
import { ITaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";
import { DashboardAnalyticsRaw, TaskAnalyticsResult } from "../../types/analytical.types";

export interface ITaskRepository {
  createTask(taskData: ITask): Promise<ITaskModel>;
  updateTask(
    taskId: Types.ObjectId,
    data: Partial<ITask>,
  ): Promise<ITaskModel | null>;
  deleteTask(taskId: Types.ObjectId): Promise<ITaskModel | null>;
  getTasks(userId:Types.ObjectId):Promise<ITaskModel[]|null>
  getDashboardAnalytics(filter:QueryFilter<ITaskModel>):Promise<DashboardAnalyticsRaw[]>
}
