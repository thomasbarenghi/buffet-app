'use client'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { toast } from 'sonner'
import { OrdersGrid } from '@/components'
import { Switch, Tab, Tabs } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { changeShopStatus } from '@/services/api-client'
import { endpoints } from '@/utils/constants'
import { PaymentStatusApiEnum, RoleEnum, type OrderInterface } from '@/interfaces'

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
  const { data: ordersPrev, mutate } = useSWR<OrderInterface[]>(endpoints.shops.ACTIVE_ORDERS, {
    refreshInterval: 30000
  })

  console.log(ordersPrev)

  const [isSelected, setIsSelected] = useState(shopStatus)
  const orders = orderFiltering(ordersPrev ?? [])

  const handleShopStatus = async (v: boolean) => {
    try {
      setIsSelected(v)
      await changeShopStatus(v)
      toast.success('Actualizado correctamente')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    supabase
      .channel('order-update')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `payment_status=eq.${PaymentStatusApiEnum.Completed}`
        },
        (payload) => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          mutate()
          console.log('Change received!', payload)
          toast.info('Nuevo pedido!')
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
          <Tab key='1' title={`Por aprobarse (${orders.PendingApproval.length})`}>
            <OrdersGrid orders={orders.PendingApproval} mode={RoleEnum.Attendant} />
          </Tab>
          <Tab key='2' title={`Pendientes de preparacion (${orders.PendingPreparation.length})`}>
            <OrdersGrid orders={orders.PendingPreparation} mode={RoleEnum.Attendant} />
          </Tab>
          <Tab key='3' title={`En preparacion (${orders.InProgress.length})`}>
            <OrdersGrid orders={orders.InProgress} mode={RoleEnum.Attendant} />
          </Tab>
          <Tab key='4' title={`Por ser entregados (${orders.PendingDelivery.length})`}>
            <OrdersGrid orders={orders.PendingDelivery} mode={RoleEnum.Attendant} />
          </Tab>
        </Tabs>
      </div>
    </section>
  )
}

export default Content
