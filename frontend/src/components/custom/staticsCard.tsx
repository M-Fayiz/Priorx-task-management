import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: number;
}

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <Card className="border border-kosma-lgray bg-kosma-white">
      <CardContent className="p-6">
        <p className="text-sm text-kosma-gray">{label}</p>
        <h2 className="text-2xl font-semibold text-kosma-black mt-1">
          {value}
        </h2>
      </CardContent>
    </Card>
  );
};
