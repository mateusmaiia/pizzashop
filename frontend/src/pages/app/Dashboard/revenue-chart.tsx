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
import { Label } from '@/components/ui/label'
import { DateRangePicker } from '@/components/ui/date-ranger-picker'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import {subDays} from 'date-fns'


export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })

  const { data: dailyRevenuePeriod } =
    useQuery<getDailyRevenueInPeriodResponse>({
      queryKey: ["metrics", "daily-revenue-in-period", dateRange],
      queryFn: () => getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to
      }),
    });

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between gap-8">
        <div className="space-y-1 ">
          <CardTitle>Receita no período</CardTitle>
          <CardDescription> Receita diária no período</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Período</Label>
          <DateRangePicker 
            date={dateRange}
            onDateChange={setDateRange}
          />
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
