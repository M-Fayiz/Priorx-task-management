import { Types, UpdateQuery } from "mongoose";
import { ITaskModel, TaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";
import { BaseRepository } from "../baseRepository";
import { ITaskRepository } from "../interface/ITaskRepository";

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
    console.log(userId)
    return this.find({ userId });
    }

}
