import { OrderStatusApiEnum } from '@/interfaces'
import { type UserResponse, type SupabaseClient } from '@supabase/supabase-js'

export const productsCustomerTemplate = `
*,
customer: profiles ( * ),
products: orders_products ( ...products (*) )
`
export const statusActive = [
  OrderStatusApiEnum.PendingPayment,
  OrderStatusApiEnum.InProgress,
  OrderStatusApiEnum.PendingApproval,
  OrderStatusApiEnum.PendingDelivery,
  OrderStatusApiEnum.PendingPreparation
]

export const statusFinished = [OrderStatusApiEnum.Delivered, OrderStatusApiEnum.Canceled]

export const getShopAll = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(productsCustomerTemplate)
  return { data, error }
}

export const getShopFinished = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(productsCustomerTemplate).in('status', statusFinished)
  return { data, error }
}

export const getShopActive = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(productsCustomerTemplate).in('status', statusActive)
  return { data, error }
}

export const getUserAll = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(productsCustomerTemplate)
    .eq('customer_id', user.data.user?.id ?? '')

  return { data, error }
}

export const getUserFinished = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(productsCustomerTemplate)
    .eq('customer_id', user.data.user?.id ?? '')
    .in('status', statusFinished)
  return { data, error }
}

export const getUserActive = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(productsCustomerTemplate)
    .eq('customer_id', user.data.user?.id ?? '')
    .in('status', statusActive)

  return { data, error }
}
