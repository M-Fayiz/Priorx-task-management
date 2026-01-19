import { ITaskModel } from "../../model/task.model";
import { TaskAnalyticsResult } from "../../types/analytical.types";
import { DashboardAnalyticsDto } from "../../types/mapper-types/dashboard.dto.types";
import { ITask, ITaskFromClient } from "../../types/task.types";

export interface ITaskService {
  createTask(data: ITaskFromClient,
  userIdFromToken: string): Promise<ITaskModel>;
  updateTask(taskId: string, userId: string, data: Partial<ITask>):Promise<ITaskModel>;
  deleteTask(taskId: string, userId: string):Promise<void>;
  getTask(userId:string):Promise<ITaskModel[]>
  getDashboardAnalytics(userId:string):Promise<DashboardAnalyticsDto>
}
