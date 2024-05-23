import { Building, ChevronDown, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { getManagedRestaurant } from '@/api/get-managed-restaurant'

export function AccountMenu(){

    const {data: profile, isLoading: isLoadingProfile} = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile
    })
    // agora se eu tiver outra requisição com esse nome de queryKey, ela não vai fazer essa requisição de NavigationOff, vai pegar do cache para evitar duplicar a requisição

    const {data: managedRestaurant, isLoading: isLoadingManagedRestaurant} = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant
    })
    
    return(
        <DropdownMenu>
            {/* //asChild --> passa todas as funcionalidades e propriedades para o componente logo abaixo dele */}
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='flex items-center gap-2 select-none'>
                    {managedRestaurant?.name}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel className='flex flex-col'>
                    <span>{profile?.name}</span>
                    <span className='text-xs font-normal text-muted-foreground'>{profile?.email}</span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator/>

                <DropdownMenuItem>
                    <Building className='w-4 h-4 mr-2'/>
                    <span>Perfil da loja</span>
                </DropdownMenuItem>


                <DropdownMenuItem  className='text-rose-500 dark:text-rose-400'>
                    <LogOut className='w-4 h-4 mr-2'/>
                    <Link to="/sign-up">Sair</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}