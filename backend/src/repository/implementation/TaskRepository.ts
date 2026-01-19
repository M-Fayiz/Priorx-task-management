import { QueryFilter, Types, UpdateQuery } from "mongoose";
import { ITaskModel, TaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";
import { BaseRepository } from "../baseRepository";
import { ITaskRepository } from "../interface/ITaskRepository";
import { DashboardAnalyticsRaw, TaskAnalyticsResult } from "../../types/analytical.types";

export class TaskRepository
  extends BaseRepository<ITaskModel>
  implements ITaskRepository
{
  constructor() {
    super(TaskModel);
  }

  async createTask(taskData: ITask): Promise<ITaskModel> {
    return await this.create(taskData);
  }
  async updateTask(
    taskId: Types.ObjectId,
    data: UpdateQuery<ITaskModel>,
  ): Promise<ITaskModel | null> {
    return await this.update(taskId, data);
  }
  async deleteTask(taskId: Types.ObjectId): Promise<ITaskModel | null> {
    return await this.delete(taskId);
  }
  async getTasks(userId: Types.ObjectId): Promise<ITaskModel[]> {
    
    return await this.find({ userId });
    }

    async  getDashboardAnalytics(filter:QueryFilter<ITaskModel>):Promise<DashboardAnalyticsRaw[]>{
        const now=new Date()
        return await this.aggregate<DashboardAnalyticsRaw>([
  { $match: filter },

  {
    $facet: {
    
      summary: [
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
            },
            overdue: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $lt: ["$dueDate", now] },
                      { $ne: ["$status", "completed"] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ],

      statusDistribution: [
        {
          $group: {
            _id: "$status",
            value: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: 1,
          },
        },
      ],

     
      overdueVsCompleted: [
        {
          $group: {
            _id: {
              $cond: [
                {
                  $and: [
                    { $lt: ["$dueDate", now] },
                    { $ne: ["$status", "completed"] },
                  ],
                },
                "Overdue",
                "Completed",
              ],
            },
            value: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            value: 1,
          },
        },
      ],

    },
  },
]);
    }

}
