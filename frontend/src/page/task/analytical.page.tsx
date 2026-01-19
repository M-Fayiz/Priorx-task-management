import { StatCard } from "@/components/custom/staticsCard";
import { StatusPieChart } from "@/components/custom/pieChart";
import { OverdueBarChart } from "@/components/custom/barChart";
import { MainLayout } from "@/components/layout/miniLayout";
import { useEffect, useState } from "react";
import { TaskService } from "@/service/task.service";
import { useAuthStore } from "@/store/auth.store";
import type { DashboardAnalyticsDto } from "@/types/task.types";

export const AnalyticsPage = () => {
  const { user } = useAuthStore();
  const [analyticsData, setAnalyticsData] =
    useState<DashboardAnalyticsDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    (async () => {
      try {
        const dashData = await TaskService.getDashData(user._id);
        console.log(dashData)
        setAnalyticsData(dashData);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?._id]);

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-kosma-gray mt-10">
          Loading analytics…
        </p>
      </MainLayout>
    );
  }

  if (!analyticsData) {
    return (
      <MainLayout>
        <p className="text-center text-kosma-gray mt-10">
          No analytics data available
        </p>
      </MainLayout>
    );
  }

  const { summary, statusDistribution, overdueVsCompleted } = analyticsData;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Tasks" value={summary.total} />
          <StatCard label="Completed" value={summary.completed} />
          <StatCard label="Overdue" value={summary.overdue} />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <StatusPieChart data={statusDistribution} />
          <OverdueBarChart data={overdueVsCompleted} />
        </div>
      </div>
    </MainLayout>
  );
};
