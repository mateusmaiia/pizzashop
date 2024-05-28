import { api } from '@/lib/axios'

export interface appproveOrderProps{
    orderId: string
}

export async function approveOrder({orderId}:appproveOrderProps){
    await api.patch(`/orders/${orderId}/approve`)
}