import { TaskRepository } from "../repository/implementation/TaskRepository";
import { UserRepository } from "../repository/implementation/UserRepository";

// User Repository
export const userRepository = new UserRepository();

// Task Repository
export const taskRepository = new TaskRepository();
