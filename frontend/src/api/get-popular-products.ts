import { api } from '@/lib/axios'

export type popularProductsResponse = {
    product: string 
    amount: number
}[]

export async function getPopularProducts(){
    const response = await api.get<popularProductsResponse>('/metrics/popular-products')

    return response.data
}