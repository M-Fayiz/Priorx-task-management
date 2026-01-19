export type TaskStatus = "pending" | "in-progress" | "completed";

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
}
