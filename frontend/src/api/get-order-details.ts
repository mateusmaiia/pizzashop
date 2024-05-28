import { api } from '@/lib/axios'

export interface orderDetailsResponse{
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    id: string;
    createdAt: string;
    totalInCents: number;
    customer: {
        name: string;
        email: string;
        phone: string | null;
    };
    orderItems: {
        id: string,
        priceInCents: number,
        quantity: number,
        product:{
            name: string
        } 
    }[]
}

interface getOrderDetailsParams{
    orderId: string
}

export async function getOrderDetails({orderId}:getOrderDetailsParams){
    const response = await api.get<orderDetailsResponse>(`/orders/${orderId}`)

    return response.data
}