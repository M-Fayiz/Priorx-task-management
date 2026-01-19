import { Router } from "express";
const taskRouter = Router();
import { asyncHandler } from "../util/asyncHandler.util";
import { taskController } from "../container";

taskRouter.post("/create", asyncHandler(taskController.createTask));

export default taskRouter;
