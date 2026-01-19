import { ITaskModel } from "../../model/task.model";
import { ITask } from "../../types/task.types";

export interface ITaskRepository{
    createTask(taskData:ITask):Promise<ITaskModel>
}