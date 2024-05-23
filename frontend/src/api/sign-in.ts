import { api } from '@/lib/axios'

export interface SigInBody{
    email: string
}

export async function signIn({email}: SigInBody){
    await api.post('/authenticate', {email})
}