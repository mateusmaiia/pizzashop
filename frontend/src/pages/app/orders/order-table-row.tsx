import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from '@/components/order-status'

import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { approveOrder } from '@/api/approve-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'

export interface OrderTableRowProps{
  order: {
    orderId: string;
    createdAt: string ;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }
} 
export function OrderTableRow({order}: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  

function updateOrderStatusOnCache(orderId: string, status: OrderStatus){
    const orderListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    orderListCache.forEach(([cacheKey, cacheData])=> {
      if(!cacheData){
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders:cacheData.orders.map(order => {
          if(order.orderId === orderId){
            return {...order, status}
          }

          return order
        })
      })
    });
  }


  const {mutateAsync: cancelOrderFn, isPending: isCanceledOrder} = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, {orderId}){
      updateOrderStatusOnCache(orderId, 'canceled')
    }
  })

  const {mutateAsync: approveOrderFn, isPending: isApprovingOrder} = useMutation({
    mutationFn: approveOrder,
    onSuccess(_, {orderId}){
      updateOrderStatusOnCache(orderId, 'processing')
    }
  }
)
  const {mutateAsync: deliverOrderFn, isPending: isDeliveringOrder} = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_, {orderId}){
      updateOrderStatusOnCache(orderId, 'delivered')
    }
  })

  const {mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder} = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_, {orderId}){
      updateOrderStatusOnCache(orderId, 'delivering')
    }
  })
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhe do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen}/>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status}/>
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">{(order.total / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}</TableCell>
      <TableCell className="">
        {order.status === 'pending' && (
          <Button onClick={() => approveOrderFn({orderId: order.orderId})} variant="outline" size="xs" disabled={isApprovingOrder}>
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button onClick={() => dispatchOrderFn({orderId: order.orderId})} variant="outline" size="xs" disabled={isDispatchingOrder}>
            <ArrowRight className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button onClick={() => deliverOrderFn({orderId: order.orderId})} variant="outline" size="xs" disabled={isDeliveringOrder}>
            <ArrowRight className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell className="">
        <Button disabled={!['pending', 'processing'].includes(order.status) || isCanceledOrder} variant="ghost" size="xs" onClick={() => cancelOrderFn({orderId: order.orderId})}>
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
