import { DashboardAnalyticsDto, DistributionItemDto } from "../types/mapper-types/dashboard.dto.types";

export function mapDashboardAnalyticsToDto(
  raw: DashboardAnalyticsRaw
): DashboardAnalyticsDto {
  const summary = raw.summary[0];

  return {
    summary: {
      total: summary?.total ?? 0,
      completed: summary?.completed ?? 0,
      pending: summary?.pending ?? 0,
      inProgress: summary?.inProgress ?? 0,
      overdue: summary?.overdue ?? 0,
    },
    statusDistribution: raw.statusDistribution ?? [],
    overdueVsCompleted: raw.overdueVsCompleted ?? [],
  };
}



interface DashboardAnalyticsRaw {
  summary: Array<{
    _id: null;
    total: number;
    completed: number;
    pending: number;
    inProgress: number;
    overdue: number;
  }>;
  statusDistribution: DistributionItemDto[];
  overdueVsCompleted: DistributionItemDto[];
}
