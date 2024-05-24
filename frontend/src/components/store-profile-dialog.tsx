import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { useQuery } from '@tanstack/react-query'

// Definindo o esquema de validação com Zod
const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string()
}) 


// Inferindo o tipo a partir do esquema Zod
type StoreProfileSchemaType = z.infer<typeof storeProfileSchema>


export function StoreProfileDialog(){

    // Buscando dados do restaurante gerenciado
    const {data: managedRestaurant, isLoading: isLoadingManagedRestaurant} = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant
    })
    
    // Configurando o formulário com validação usando o resolver do Zod
    const {register, handleSubmit } = useForm<StoreProfileSchemaType>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        }
    })

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>
            <form >
                <div className='space-y-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='name'>
                            Nome
                        </Label>
                        <Input className='col-span-3' id='name' {...register('name')}/>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label className='text-right' htmlFor='description'>
                            Descrição
                        </Label>
                        <Textarea className='col-span-3' id='description' {...register('description')}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" type='button'>Cancelar</Button>
                    <Button type='submit' variant='success'>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}