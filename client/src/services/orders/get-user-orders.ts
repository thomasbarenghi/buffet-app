import { type UserResponse, type SupabaseClient } from '@supabase/supabase-js'
import { productsCustomerTemplate, statusActive, statusFinished } from './local-utils'
import { type OrderInterface, type Response } from '@/interfaces'

const getAll = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(productsCustomerTemplate)
    .eq('customer_id', user.data.user?.id ?? '')

  return { data, error }
}

const getFinished = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(productsCustomerTemplate)
    .eq('customer_id', user.data.user?.id ?? '')
    .in('status', statusFinished)
  return { data, error }
}

const getActive = async (supabase: SupabaseClient, user: UserResponse) => {
  const { data, error } = await supabase
    .from('orders')
    .select(productsCustomerTemplate)
    .eq('customer_id', user.data.user?.id ?? '')
    .in('status', statusActive)

  return { data, error }
}

export const getUserOrders = async (
  supabase: SupabaseClient,
  type: 'active' | 'finished' | 'all'
): Promise<Response<OrderInterface[]>> => {
  const user = await supabase.auth.getUser()
  let response

  if (type === 'all') response = await getAll(supabase, user)
  else if (type === 'active') response = await getActive(supabase, user)
  else if (type === 'finished') response = await getFinished(supabase, user)

  return {
    data: response?.data as unknown as OrderInterface[],
    error: response?.error ?? null
  }
}
