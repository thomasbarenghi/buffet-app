'use client'
import { OrdersGrid } from '@/components'
import { type OrderInterface } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWR from 'swr'

const Content = () => {
  const supabase = createClientComponentClient<Database>()
  const { data: orders, mutate } = useSWR<OrderInterface[]>(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey), {
    refreshInterval: 30000
  })

  useEffect(() => {
    supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Change received!', payload)
        toast.info('Ocurrió un cambio en tu pedido')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        mutate()
      })
      .subscribe()
  }, [])

  return <OrdersGrid orders={orders ?? []} mode='customer' />
}

export default Content
