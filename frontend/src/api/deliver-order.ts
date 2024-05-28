import { api } from '@/lib/axios'

export interface deliverOrderProps{
    orderId: string
}

export async function deliverOrder({orderId}:deliverOrderProps){
    await api.patch(`/orders/${orderId}/deliver`)
}