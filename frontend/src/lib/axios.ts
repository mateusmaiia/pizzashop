import { env } from '@/env'
import axios from 'axios'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true
})


//interceptors --> Antes de todas as requisições do axios, eu vou chamar essa daqui.   (estudar mais sobre depois INTERCEPTORS (serve para customizar dados de uma requisição))

if(env.VITE_ENABLE_API_DELAY){
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, Math.round(Math.random() * 3000)))

    return config
  })
}

// withCredential: true --> faz com que os cookies do frontend sejam enviados para o backend