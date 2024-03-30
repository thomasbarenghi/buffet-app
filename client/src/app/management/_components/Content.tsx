'use client'
import { OrdersGrid } from '@/components'
import { PaymentStatusApiEnum, RoleEnum, type OrderInterface } from '@/interfaces'
import { changeOrderStatus } from '@/services/shop/change-order-status.service'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { Switch, Tab, Tabs } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

interface FilteredOrders {
  PendingApproval: OrderInterface[]
  PendingPreparation: OrderInterface[]
  InProgress: OrderInterface[]
  PendingDelivery: OrderInterface[]
  PendingPayment: OrderInterface[]
}

const orderFiltering = (orders: OrderInterface[]): FilteredOrders => {
  const filteredOrders: FilteredOrders = {
    PendingApproval: [],
    PendingPreparation: [],
    InProgress: [],
    PendingDelivery: [],
    PendingPayment: []
  }

  for (const order of orders) {
    switch (order.status) {
      case 'PendingPayment':
        filteredOrders.PendingPayment.push(order)
        break
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

const Content = ({ shopStatus }: { shopStatus: boolean }) => {
  const supabase = createClientComponentClient<Database>()
  const { data: ordersPrev, mutate } = useSWR<OrderInterface[]>(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey), {
    refreshInterval: 30000
  })
  const [isSelected, setIsSelected] = useState(shopStatus)
  const orders = orderFiltering(ordersPrev ?? [])

  const handleShopStatus = async (v: boolean) => {
    try {
      setIsSelected(v)
      await changeOrderStatus(v)
      toast.success('Actualizado correctamente')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload)
        // toast.info('Nuevo pedido')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        mutate()
      })
      .subscribe()

    supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `payment_status=eq.${PaymentStatusApiEnum.Completed} `
        },
        (payload) => {
          console.log('Change received!', payload)
          toast.info('Nuevo pedido')
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          mutate()
        }
      )
      .subscribe()
  }, [])

  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <h1 className='text-2xl font-medium leading-tight'>Pedidos activos ({ordersPrev?.length})</h1>
        <Switch isSelected={isSelected} classNames={{ label: 'font-light' }} onValueChange={handleShopStatus}>
          {isSelected ? 'Recibiendo pedidos' : 'No recibiendo pedidos'}
        </Switch>
      </div>
      <div className='flex min-h-[500px] w-full flex-col items-start gap-2 2xl:container'>
        <Tabs
          variant='solid'
          color='primary'
          classNames={{
            base: 'grid',
            panel: 'w-full',
            tabList: 'bg-white border'
          }}
        >
          <Tab key='1' title='Por aprobarse'>
            <OrdersGrid orders={orders.PendingApproval} mode={RoleEnum.Attendant} />
          </Tab>
          <Tab key='2' title='Pendientes de preparacion'>
            <OrdersGrid orders={orders.PendingPreparation} mode={RoleEnum.Attendant} />
          </Tab>
          <Tab key='3' title='En preparacion'>
            <OrdersGrid orders={orders.InProgress} mode={RoleEnum.Attendant} />
          </Tab>
          <Tab key='4' title='Por ser entregados'>
            <OrdersGrid orders={orders.PendingDelivery} mode={RoleEnum.Attendant} />
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}

export default Content
