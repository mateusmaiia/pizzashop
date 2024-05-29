import { api } from '@/lib/axios'

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number 
  diffFromLastMonth: number
}

export async function getMonthCanceledOrdersAmount(){
  const response = await api.get<GetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )
  console.log(response.data.amount)
  return response.data
}