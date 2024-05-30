import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodyQuery{
  from?: Date
  to?: Date
}

export type getDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod({from, to}: GetDailyRevenueInPeriodyQuery) {
  const response = await api.get<getDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from, 
        to
      }
    }
  );

  return response.data;
}
