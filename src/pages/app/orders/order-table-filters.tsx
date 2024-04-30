import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'

export function OrderTableFilters(){
    return(
        <form className='flex items-center gap-2'>
            <span className='text-sm font-semibold'>Filtros:</span>
            <Input placeholder='ID do pedido' className='h-8 w-auto'/>
            <Input placeholder='Nome do cliente' className='h-8 w-[320px]'/>
            <Select defaultValue="all">
                <SelectTrigger  className='h-8 w-[180px]'>
                    {/* Exibe o texto do item selecionado atualmente pelo usuário */}
                    <SelectValue />
                </SelectTrigger>
                <SelectContent >
                    <SelectItem value='all'>Todos status</SelectItem>
                    <SelectItem value='pending'>Pendente</SelectItem>
                    <SelectItem value='canceled'>Cancelado</SelectItem>
                    <SelectItem value='processing'>Processando</SelectItem>
                    <SelectItem value='delivering'>Em preparo</SelectItem>
                    <SelectItem value='delivered'>Entregue</SelectItem>
                </SelectContent>
            </Select>

            <Button type='submit' variant="secondary" size="xs">
                <Search className='mr-2 h-4 w-4'/>
                Filtrar resultados
            </Button>

            <Button type='button' variant="outline" size="xs">
                <X className='mr-2 h-4 w-4'/>
                Remover filtros
            </Button>
        </form>
    )
}