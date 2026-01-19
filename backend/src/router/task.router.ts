import { Router } from "express";
const taskRouter = Router();
import { asyncHandler } from "../util/asyncHandler.util";
import { taskController } from "../container";
import { verifyUser } from "../middleware/authentication.middleware";

taskRouter.get("/user/:userId",verifyUser, asyncHandler(taskController.getTasks));
taskRouter.post("/create",verifyUser, asyncHandler(taskController.createTask));
taskRouter.delete("/:taskId/user/:userId",verifyUser, asyncHandler(taskController.deleteTask));
taskRouter.put("/:taskId", verifyUser,asyncHandler(taskController.updateTask));
taskRouter.get("/dashboard/:userId", verifyUser,asyncHandler(taskController.getdashboardData));

export default taskRouter;
