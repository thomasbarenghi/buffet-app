import 'server-only'
import {
  type Response,
  type OrderInterface,
  OrderStatusApiEnum,
  PaymentStatusApiEnum,
  type CartItem,
  type CreateOrderRequest,
  PaymentMethodsApiEnum
} from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { calculateFinalPrice, generateRandomNumber } from '@/utils/functions'
import { getShopActive, getShopAll, getShopFinished, getUserActive, getUserAll, getUserFinished } from './order.utils'
import { clientUrl, endpoints } from '@/utils/constants'
import { getShopStatus } from '../shop.service'

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
  const { data, error } = await supabase.from('orders').select().eq('id', id).single()
  const res = data as OrderInterface
  return { error, data: res }
}

const getPreference = async (products: CartItem[], orderData: OrderInterface) => {
  const response = await fetch(clientUrl + endpoints.orders.CHECKOUT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      products,
      orderId: orderData.id
    })
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  return data
}

export const createOrder = async (req: CreateOrderRequest): Promise<Response<OrderInterface>> => {
  const { details, products } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const totalPrice = calculateFinalPrice(products)
  const { data: shopStatus } = await getShopStatus()

  if (!shopStatus?.is_open) {
    return {
      data: null,
      error: {
        code: 400,
        message: 'Shop is close'
      }
    }
  }

  console.log(products, details)

  const { data: orderData, error } = await supabase
    .from('orders')
    .insert([
      {
        total_price: totalPrice,
        customer_id: user.data.user?.id ?? '',
        instructions: details?.instructions,
        payment_method: details?.payment_method,
        status:
          details?.payment_method === 'MercadoPago'
            ? OrderStatusApiEnum.PendingPayment
            : OrderStatusApiEnum.PendingApproval,
        payment_status: PaymentStatusApiEnum.Pending,
        code: generateRandomNumber()
      }
    ])
    .select()
    .single()

  if (!orderData) throw new Error()

  let preference

  if (details.payment_method === PaymentMethodsApiEnum.MercadoPago) {
    preference = await getPreference(products, orderData as OrderInterface)

    const { error: errorUpdate } = await supabase
      .from('orders')
      .update({
        payment_link: preference?.url as string
      })
      .eq('id', orderData?.id)
      .select()
      .single()

    console.log(errorUpdate?.message)

    orderData.payment_link = preference?.url as string
    console.log('orderData.payment_link', orderData.payment_link)
  }

  for (const iterator of products) {
    const { error: errorI } = await supabase
      .from('orders_products')
      .insert([{ order_id: orderData?.id, product_id: iterator.id, quantity: iterator.quantity }])
      .select()

    if (errorI) throw new Error()
  }

  const res = orderData as OrderInterface
  return { error, data: res }
}

export const changeStatus = async (status: OrderStatusApiEnum, id: string): Promise<Response<OrderInterface>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data } = await supabase
    .from('orders')
    .update({
      status,
      ...(status === OrderStatusApiEnum.Delivered && { payment_status: PaymentStatusApiEnum.Completed })
    })
    .eq('id', id)
    .select()
    .single()

  const res = data as OrderInterface
  return { error, data: res }
}
