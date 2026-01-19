import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export interface ChartDataItem {
  name: string;
  value: number;
}


export const OverdueBarChart = ({
  data,
}: {
  data: ChartDataItem[];
}) => {
  return (
    <Card className="border border-kosma-lgray bg-kosma-white">
      <CardHeader>
        <CardTitle>Overdue vs Completed</CardTitle>
      </CardHeader>

      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Bar
              dataKey="value"
              fill="#0F0F0F"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
