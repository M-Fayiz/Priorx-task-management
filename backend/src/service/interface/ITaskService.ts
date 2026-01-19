import { ITaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";

export interface ITaskService{
    createTask(taskData:ITask):Promise<ITaskModel>
}