'use client'
import { OrdersGrid } from '@/components'
import { type OrderInterface } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { Tab, Tabs } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

interface FilteredOrders {
  PendingApproval: OrderInterface[]
  PendingPreparation: OrderInterface[]
  InProgress: OrderInterface[]
  PendingDelivery: OrderInterface[]
}

const orderFiltering = (orders: OrderInterface[]): FilteredOrders => {
  const filteredOrders: FilteredOrders = {
    PendingApproval: [],
    PendingPreparation: [],
    InProgress: [],
    PendingDelivery: []
  }

  for (const order of orders) {
    switch (order.status) {
      case 'PendingApproval':
        filteredOrders.PendingApproval.push(order)
        break
      case 'PendingPreparation':
        filteredOrders.PendingPreparation.push(order)
        break
      case 'InProgress':
        filteredOrders.InProgress.push(order)
        break
      case 'PendingDelivery':
        filteredOrders.PendingDelivery.push(order)
        break
      default:
        console.log(`Unknown order status: ${order.status}`)
    }
  }

  return filteredOrders
}

const Content = () => {
  const supabase = createClientComponentClient<Database>()
  const { data: ordersPrev, mutate } = useSWR<OrderInterface[]>(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey), {
    refreshInterval: 30000
  })
  const orders = orderFiltering(ordersPrev ?? [])

  useEffect(() => {
    supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload)
        toast.info('Nuevo pedido')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        mutate()
      })
      .subscribe()
  }, [])

  return (
    <section className='flex w-full flex-col gap-4'>
      <h1 className='text-[24px] font-medium leading-tight'>Pedidos activos ({ordersPrev?.length})</h1>
      <div className='flex min-h-[500px] w-full flex-col items-start gap-2 2xl:container'>
        <Tabs
          variant='solid'
          classNames={{
            base: 'grid',
            panel: 'w-full'
          }}
        >
          <Tab key='1' title='Por aprobarse'>
            <OrdersGrid orders={orders.PendingApproval} mode='shop' />
          </Tab>
          <Tab key='2' title='Pendientes de preparacion'>
            <OrdersGrid orders={orders.PendingPreparation} mode='shop' />
          </Tab>
          <Tab key='3' title='En preparacion'>
            <OrdersGrid orders={orders.InProgress} mode='shop' />
          </Tab>
          <Tab key='4' title='Por ser entregados'>
            <OrdersGrid orders={orders.PendingDelivery} mode='shop' />
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}

export default Content
