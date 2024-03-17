import { OrderStatusApiEnum, type OrderInterface } from '@/interfaces'
import { type SupabaseClient } from '@supabase/supabase-js'

const getAll = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(
    `
        *,
        customer: profiles ( * ),
        products: orders_products ( ...products (*) )
    `
  )

  return { data, error }
}

const getFinished = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      customer: profiles ( * ),
      products: orders_products ( ...products (*) )
  `
    )
    .in('status', [OrderStatusApiEnum.Delivered, OrderStatusApiEnum.Canceled])
  return { data, error }
}

const getActive = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
        *,
        customer: profiles ( * ),
        products: orders_products ( ...products (*) )
    `
    )
    .in('status', [
      OrderStatusApiEnum.InProgress,
      OrderStatusApiEnum.PendingApproval,
      OrderStatusApiEnum.PendingDelivery,
      OrderStatusApiEnum.PendingPreparation
    ])

  return { data, error }
}

export const getShopOrders = async (
  supabase: SupabaseClient,
  type: 'active' | 'finished' | 'all'
): Promise<OrderInterface[]> => {
  let response

  if (type === 'all') response = await getAll(supabase)
  else if (type === 'active') response = await getActive(supabase)
  else if (type === 'finished') response = await getFinished(supabase)

  const orders = response?.data as unknown as OrderInterface[]

  if (response?.error) {
    console.error(response.error)
  }

  return orders
}
