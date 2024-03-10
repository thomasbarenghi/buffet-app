import { type OrderInterface } from '@/interfaces'
import { type SupabaseClient } from '@supabase/supabase-js'

export const getUserOrders = async (supabase: SupabaseClient): Promise<OrderInterface[]> => {
  const user = await supabase.auth.getUser()
  const { data: ordersB, error } = await supabase
    .from('orders')
    .select(
      `
        *,
        customer: profiles ( * ),
        products: orders_products ( ...products (*) )
    `
    )
    .eq('customer_id', user.data.user?.id ?? '')

  const orders = ordersB as unknown as OrderInterface[]

  if (error) {
    console.error(error)
  }

  return orders
}
