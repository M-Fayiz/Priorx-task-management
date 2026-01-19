import { ITaskModel, TaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";
import { BaseRepository } from "../baseRepository";
import { ITaskRepository } from "../interface/ITaskRepository";


export class TaskRepository extends BaseRepository<ITaskModel> implements ITaskRepository{
    
    constructor(){
        super(TaskModel)
    }

    async createTask(taskData:ITask):Promise<ITaskModel>{
        return await this.create(taskData)
    }
}