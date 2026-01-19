import { Types } from "mongoose";
import { ITaskModel } from "../../model/task.model";
import { ITaskRepository } from "../../repository/interface/ITaskRepository";
import { IEventPublisher } from "../../shared/interface/IEventPublisherInterface";
import { ITask, ITaskFromClient } from "../../types/task.types";
import { ITaskService } from "../interface/ITaskService";
import { TASK_EVENTS } from "../../constant/taskEvents.constants";
import { createHttpError } from "../../util/appErrors";
import { HttpStatus } from "../../constant/httpStatusCode.const";
import { HttpResponse } from "../../constant/errorResonponst.constant";

export class TaskService implements ITaskService {
  constructor(
    private _taskRepository: ITaskRepository,
    private _publisher: IEventPublisher,
  ) {}

  async createTask(data: ITaskFromClient) {

    const user_Id = new Types.ObjectId(data.userId);

    const task = await this._taskRepository.createTask({
      ...data,
      userId: user_Id,
    });

    this._publisher.emit(TASK_EVENTS.CREATED, task, data.userId);

    return task;
  }

  async updateTask(taskId: string, userId: string, data: Partial<ITask>):Promise<ITaskModel> {
    const task_id = new Types.ObjectId(taskId);

    const task = await this._taskRepository.updateTask(task_id, data);

    if(!task){
        throw createHttpError(HttpStatus.NOT_FOUND,HttpResponse.TAST_NOT_FOUND)
    }

    this._publisher.emit(TASK_EVENTS.UPDATED, task, userId);
    

    return task;
  }

  async deleteTask(taskId: string, userId: string):Promise<void> {

    const task_id = new Types.ObjectId(taskId);

    await this._taskRepository.deleteTask(task_id);

    this._publisher.emit(TASK_EVENTS.DELETED, taskId, userId);
  }
  async getTask(userId: string): Promise<ITaskModel[] > {
      const user_id  = new Types.ObjectId(userId)

      const tasks = await this._taskRepository.getTasks(user_id)

      if(!tasks){
        throw createHttpError(HttpStatus.NOT_FOUND,HttpResponse.TAST_NOT_FOUND)
      }

      return tasks
  }

}
