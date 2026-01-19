import { AuthController } from "../controller/implementation/AuthController";
import { TaskController } from "../controller/implementation/TaskController";
import { authService, taskServce } from "./services";

// auth controller
export const authController = new AuthController(authService)

// task controller 
export const taskController = new TaskController(taskServce)