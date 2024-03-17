import { type Response, type OrderInterface } from '@/interfaces'
import { type SupabaseClient } from '@supabase/supabase-js'
import { productsCustomerTemplate, statusActive, statusFinished } from './local-utils'

const getAll = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(productsCustomerTemplate)
  return { data, error }
}

const getFinished = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(productsCustomerTemplate).in('status', statusFinished)
  return { data, error }
}

const getActive = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase.from('orders').select(productsCustomerTemplate).in('status', statusActive)
  return { data, error }
}

export const getShopOrders = async (
  supabase: SupabaseClient,
  type: 'active' | 'finished' | 'all'
): Promise<Response<OrderInterface[]>> => {
  let response

  if (type === 'all') response = await getAll(supabase)
  else if (type === 'active') response = await getActive(supabase)
  else if (type === 'finished') response = await getFinished(supabase)

  return {
    data: response?.data as unknown as OrderInterface[],
    error: response?.error ?? null
  }
}
