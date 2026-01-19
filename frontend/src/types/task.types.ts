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

export interface TaskStats {
  total: number;
  completed: number;
  overdue: number;
  pending: number;
  inProgress: number;
}

export class DashboardSummaryDto {
  total!: number;
  completed!: number;
  pending!: number;
  inProgress!: number;
  overdue!: number;
}

export class DistributionItemDto {
  name!: string;
  value!: number;
}

export class DashboardAnalyticsDto {
  summary!: DashboardSummaryDto;
  statusDistribution!: DistributionItemDto[];
  overdueVsCompleted!: DistributionItemDto[];
}
