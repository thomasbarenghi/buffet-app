import { OrderStatusApiEnum, type OrderInterface } from '@/interfaces'
import { type UserResponse, type SupabaseClient } from '@supabase/supabase-js'

const getAll = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
        *,
        customer: profiles ( * ),
        products: orders_products ( ...products (*) )
    `
    )
    .eq('customer_id', user.data.user?.id ?? '')

  return { data, error }
}

const getFinished = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
        *,
        customer: profiles ( * ),
        products: orders_products ( ...products (*) )
    `
    )
    .eq('customer_id', user.data.user?.id ?? '')
    .in('status', [OrderStatusApiEnum.Delivered, OrderStatusApiEnum.Canceled])

  return { data, error }
}

const getActive = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
        *,
        customer: profiles ( * ),
        products: orders_products ( ...products (*) )
    `
    )
    .eq('customer_id', user.data.user?.id ?? '')
    .in('status', [
      OrderStatusApiEnum.InProgress,
      OrderStatusApiEnum.PendingApproval,
      OrderStatusApiEnum.PendingDelivery,
      OrderStatusApiEnum.PendingPreparation
    ])

  return { data, error }
}

export const getUserOrders = async (
  supabase: SupabaseClient,
  type: 'active' | 'finished' | 'all'
): Promise<OrderInterface[]> => {
  const user = await supabase.auth.getUser()
  let response

  if (type === 'all') response = await getAll(supabase, user)
  else if (type === 'active') response = await getActive(supabase, user)
  else if (type === 'finished') response = await getFinished(supabase, user)

  const orders = response?.data as unknown as OrderInterface[]

  if (response?.error) {
    console.error(response.error)
  }

  return orders
}
