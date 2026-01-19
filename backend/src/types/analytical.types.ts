export interface TaskSummary {
  total: number;
  completed: number;
  overdue: number;
  pending: number;
  inProgress: number;
}

export interface StatusDistributionItem {
  name: "pending" | "in-progress" | "completed";
  value: number;
}

export interface OverdueVsCompletedItem {
  name: "Overdue" | "Completed";
  value: number;
}


export interface TaskAnalyticsResult {
  summary: TaskSummary;
  statusDistribution: StatusDistributionItem[];
  overdueVsCompleted: OverdueVsCompletedItem[];

}

export interface DashboardAnalyticsRaw {
  summary: Array<{
    _id: null;
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
    overdue: number;
  }>;
  statusDistribution: {
    name: string;
    value: number;
  }[];
  overdueVsCompleted: {
    name: string;
    value: number;
  }[];
}

