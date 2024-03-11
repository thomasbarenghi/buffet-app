'use client'
import { OrdersGrid } from '@/components'
import { type OrderInterface } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import useSWR from 'swr'

const Content = () => {
  const { data: orders } = useSWR<OrderInterface[]>(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey), {
    refreshInterval: 30000
  })

  return <OrdersGrid orders={orders ?? []} mode='customer' />
}

export default Content
