import { Input } from '@/components/ui/input'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Table } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function Orders(){
    return (
        <>
            <Helmet title='Pedidos' />
            <div className='flex flex-col ga-4'>
                <h1 className='text-3xl font-bold tracking-tight'>Pedidos</h1>
            </div>
            <div className='space-y-2.5'>
                <form className='flex items-center gap-2'>
                    <span className='text-sm font-semibold'>Filtros:</span>
                    <Input placeholder='Nome do cliente' className='h-8 w-[320px]'/>
                </form>
                <div className='border rounded-md'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Identificador</TableHead>
                                <TableHead>Realizado há</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Total do pedido</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                </div>
            </div>
        </>
    )
}