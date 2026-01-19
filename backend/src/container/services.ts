import { AuthService } from "../service/implemetnation/AuthService";
import { TaskService } from "../service/implemetnation/TaskService";
import { taskRepository, userRepository } from "./repositories";

// auth service
export const authService = new AuthService(userRepository)

// task service
export const taskServce = new TaskService(taskRepository)
