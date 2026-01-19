import { NextFunction, Request, Response } from "express";
import { ITaskService } from "../../service/interface/ITaskService";
import { ITaskController } from "../interface/ITaskController";
import { successResponse } from "../../util/successResponse.util";

export class TaskController implements ITaskController{

    constructor(private _taskService:ITaskService){}

    createTask=async(req: Request, res: Response, next: NextFunction): Promise<void>=> {

        const {taskData} = req.body

        const createdTask = await this._taskService.createTask(taskData)

        successResponse(res,createdTask)
    }
}