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

