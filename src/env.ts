import {z} from 'zod'

const envSchema = z.object({
    VITE_API_URL: z.string().url()
})

// process é algo especifico do node, o vite usa o import.meta
export const env = envSchema.parse(import.meta.env)
