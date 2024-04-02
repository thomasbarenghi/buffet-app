'use client'
import { OrdersGrid } from '@/components'
import { type OrderInterface } from '@/interfaces'
import { endpoints } from '@/utils/constants/endpoints.const'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

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
      .channel('custom-insert-channel')
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
