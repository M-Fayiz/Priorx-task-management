import { NextFunction, Request, Response } from "express";
import { ITaskService } from "../../service/interface/ITaskService";
import { ITaskController } from "../interface/ITaskController";
import { successResponse } from "../../util/successResponse.util";

export class TaskController implements ITaskController {
  constructor(private _taskService: ITaskService) {}

  createTask = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { taskData } = req.body;

    const createdTask = await this._taskService.createTask(taskData);

    successResponse(res, createdTask);
  };
  updateTask=async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
      const {taskId,userId}=req.params
      const {taskData}=req.body

      const updatedTask =await this._taskService.updateTask(taskId as string,userId as string,taskData)
      successResponse(res, updatedTask);
  }
  deleteTask=async(req: Request, res: Response, next: NextFunction): Promise<void>=> {
      const {taskId,userId}=req.params
       
      await this._taskService.deleteTask(taskId as string,userId as string)
  }
  getTasks=async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
      
    const {userId}=req.params

    const tasks = await this._taskService.getTask(userId as string)

    successResponse(res,tasks)
  }
}
