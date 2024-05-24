import { Button } from './ui/button'
import { DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { zodResolver} from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { useMutation, useQuery } from '@tanstack/react-query'
import { updateProfile } from '@/api/update-profile'
import { toast } from 'sonner'

// Definindo o esquema de validação com Zod
const storeProfileSchema = z.object({
    name: z.string().min(1),
    description: z.string()
}) 


// Inferindo o tipo a partir do esquema Zod
type StoreProfileSchemaType = z.infer<typeof storeProfileSchema>


export function StoreProfileDialog(){

    // Buscando dados do restaurante gerenciado
    const {data: managedRestaurant} = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant
    })
    
    // Configurando o formulário com validação usando o resolver do Zod
    const {register, handleSubmit, formState:{isSubmitting} } = useForm<StoreProfileSchemaType>({
        resolver: zodResolver(storeProfileSchema),
        values: {
            name: managedRestaurant?.name ?? '',
            description: managedRestaurant?.description ?? '',
        }
    })

    // Configurando a mutação para atualizar o perfil
    const {mutateAsync: updateProfileFn} = useMutation({
        mutationFn: updateProfile
    })

    // Função de handle para atualizar o perfil
    async function handleUpdateProfile(data:StoreProfileSchemaType){
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description
            })

            toast.success('Perfil atualizado com sucesso!')
        } catch (error) {
            toast.error('Falha ao atualizar o perfil, tente novamente!')
        }
    }

    return(
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>
                    Atualize as informações do seu estabelecimento visíveis ao seu cliente
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateProfile)} >
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
                    <DialogClose>
                        <Button variant="ghost" type='button'>Cancelar</Button>
                    </DialogClose>
                    <Button type='submit' variant='success' disabled={isSubmitting}>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}