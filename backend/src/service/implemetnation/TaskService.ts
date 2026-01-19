import { ITaskModel } from "../../model/task.model";
import { ITaskRepository } from "../../repository/interface/ITaskRepository";
import { ITask } from "../../types/task.types";
import { ITaskService } from "../interface/ITaskService";


export class TaskService implements ITaskService{

    constructor(private _taskRepository:ITaskRepository){}

    async createTask(taskData: ITask): Promise<ITaskModel> {
        const task =await this._taskRepository.createTask(taskData)
        return task
    }
}