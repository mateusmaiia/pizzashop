import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true
})

// withCredential: true --> faz com que os cookies do frontend sejam enviados para o backend