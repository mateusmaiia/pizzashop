import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import colors from "tailwindcss/colors";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import {
  getDailyRevenueInPeriod,
  getDailyRevenueInPeriodResponse,
} from "@/api/get-daily-revenue-in-period";

const data = [
  { data: "10/12", revenue: 1200 },
  { data: "12/12", revenue: 800 },
  { data: "13/12", revenue: 900 },
  { data: "14/12", revenue: 400 },
  { data: "15/12", revenue: 2300 },
  { data: "16/12", revenue: 800 },
  { data: "17/12", revenue: 640 },
];

export function RevenueChart() {
  const { data: dailyRevenuePeriod } =
    useQuery<getDailyRevenueInPeriodResponse>({
      queryKey: ["metrics", "daily-revenue-in-period"],
      queryFn: getDailyRevenueInPeriod,
    });

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between gap-8">
        <div className="space-y-1 ">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription> Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {dailyRevenuePeriod && (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenuePeriod} style={{ fontSize: 12 }}>
              <XAxis dataKey="data" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />

              <CartesianGrid vertical={false} className="stroke-muted" />

              <Line
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
                stroke={colors.violet["500"]}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
