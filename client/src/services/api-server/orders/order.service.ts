import 'server-only'
import {
  type Response,
  type Product,
  type OrderInterface,
  OrderStatusApiEnum,
  PaymentStatusApiEnum
} from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { arrayToObject, generateRandomNumber } from '@/utils/functions'
import { getShopActive, getShopAll, getShopFinished, getUserActive, getUserAll, getUserFinished } from './order.utils'

export const revalidate = 0

export const getShopOrders = async (type: 'active' | 'finished' | 'all'): Promise<Response<OrderInterface[]>> => {
  let response
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  if (type === 'all') response = await getShopAll(supabase)
  else if (type === 'active') response = await getShopActive(supabase)
  else if (type === 'finished') response = await getShopFinished(supabase)

  return {
    data: response?.data as unknown as OrderInterface[],
    error: response?.error ?? null
  }
}

export const getUserOrders = async (type: 'active' | 'finished' | 'all'): Promise<Response<OrderInterface[]>> => {
  let response
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()

  if (type === 'all') response = await getUserAll(supabase, user)
  else if (type === 'active') response = await getUserActive(supabase, user)
  else if (type === 'finished') response = await getUserFinished(supabase, user)

  return {
    data: response?.data as unknown as OrderInterface[],
    error: response?.error ?? null
  }
}

export const getOrder = async (id: string): Promise<Response<OrderInterface>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase.from('orders').select().eq('id', id)

  return { error, data: arrayToObject<any>(data ?? []) }
}

export const createOrder = async (products: Product[], instructions: string): Promise<Response<string>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0)

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        total_price: totalPrice,
        customer_id: user.data.user?.id ?? '',
        instructions,
        status: OrderStatusApiEnum.PendingPayment,
        payment_status: PaymentStatusApiEnum.Pending,
        code: generateRandomNumber()
      }
    ])
    .select()

  if (error) throw new Error()

  for (const iterator of products) {
    const { error: errorI } = await supabase
      .from('orders_products')
      .insert([{ order_id: data[0].id, product_id: iterator.id }])
      .select()

    if (errorI) throw new Error()
  }

  return { data: data[0].id, error }
}

export const changeStatus = async (status: OrderStatusApiEnum, id: string): Promise<Response<OrderInterface>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data } = await supabase.from('orders').update({ status }).eq('id', id).select()

  return { error, data: arrayToObject<any>(data ?? []) }
}
