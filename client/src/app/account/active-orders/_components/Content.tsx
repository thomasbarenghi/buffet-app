'use client'
import { useEffect } from 'react'
import useSWR from 'swr'
import { toast } from 'sonner'
import { OrdersGrid } from '@/components'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { endpoints } from '@/utils/constants'
import { type OrderInterface } from '@/interfaces'

interface Props {
  ordersFallback: OrderInterface[]
}

const Content = ({ ordersFallback }: Props) => {
  const supabase = createClientComponentClient<Database>()
  const { data: orders, mutate } = useSWR<OrderInterface[]>(endpoints.users.ACTIVE_ORDERS('current'), {
    fallbackData: ordersFallback
  })

  useEffect(() => {
    supabase
      .channel('customer-active-orders')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload)
        toast.info('Ocurrió un cambio en tu pedido #' + payload.new.id.slice(0, 4))
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        mutate()
      })
      .subscribe()
  }, [])

  return <OrdersGrid orders={orders ?? []} mode='customer' />
}

export default Content
