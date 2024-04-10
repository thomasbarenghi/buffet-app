import 'server-only'
import {
  type Response,
  type OrderInterface,
  OrderStatusApiEnum,
  PaymentStatusApiEnum,
  type CreateOrderRequest,
  PaymentMethodsApiEnum,
  type GetPreferenceRequest,
  type GetOrdersRequest,
  type OrderQueryParams,
  type ChangeOrderStatusRequest
} from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { calculateFinalPrice, generateRandomNumber, generateServiceError } from '@/utils/functions'
import { getAllOrders } from './order.utils'
import { clientUrl, endpoints } from '@/utils/constants'
import { getShopStatus } from '../shop.service'

export const revalidate = 0

export const getOrders = async (req: GetOrdersRequest): Promise<Response<OrderInterface[]>> => {
  const { type, mode } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const user = await supabase.auth.getUser()
    if (!user?.data?.user?.id) return generateServiceError(400, 'Cant access current user id')

    const queryParams: OrderQueryParams = { supabase, type }
    if (mode === 'user') queryParams.userId = user.data.user?.id

    const { data, error } = await getAllOrders(queryParams)

    return { data, error }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

const getPreference = async (req: GetPreferenceRequest): Promise<Response<Record<string, string>>> => {
  try {
    const response = await fetch(clientUrl + endpoints.orders.CHECKOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })

    if (!response.ok) return generateServiceError(500, 'Cant generate preference')

    return { data: await response.json(), error: null }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const createOrder = async (req: CreateOrderRequest): Promise<Response<OrderInterface>> => {
  const { details, products } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { data: shopStatus, error: shopStatusError } = await getShopStatus()
    if (shopStatusError) return generateServiceError(500, shopStatusError.message)
    if (!shopStatus?.is_open) return generateServiceError(400, 'Shop is close')

    const user = await supabase.auth.getUser()
    if (!user) return generateServiceError(400, 'Cant access current user')
    const totalPrice = calculateFinalPrice(products)

    const newOrder = {
      total_price: totalPrice,
      customer_id: user.data.user?.id,
      instructions: details?.instructions,
      payment_method: details?.payment_method,
      status:
        details?.payment_method === 'MercadoPago'
          ? OrderStatusApiEnum.PendingPayment
          : OrderStatusApiEnum.PendingApproval,
      payment_status: PaymentStatusApiEnum.Pending,
      code: generateRandomNumber()
    }

    const { data: insertData, error: insertError } = await supabase.from('orders').insert([newOrder]).select().single()

    if (insertError) return generateServiceError(500, insertError.message)

    let preference

    if (details.payment_method === PaymentMethodsApiEnum.MercadoPago) {
      preference = await getPreference({ products, orderData: insertData as OrderInterface })
      const paymentLink = preference?.data?.url

      if (!paymentLink) return generateServiceError(400, 'Cant access payment link')

      const { error: updateError } = await supabase
        .from('orders')
        .update({
          payment_link: paymentLink
        })
        .eq('id', insertData?.id)
        .select()
        .single()

      if (updateError) return generateServiceError(500, updateError.message)

      insertData.payment_link = paymentLink
    }

    const insertionPromises = products.map(async (product) => {
      const { error: productInsertError } = await supabase
        .from('orders_products')
        .insert([{ order_id: insertData?.id, product_id: product.id, quantity: product.quantity }])
        .single()

      if (productInsertError) {
        return generateServiceError(500, productInsertError.message)
      }
    })

    await Promise.all(insertionPromises)

    return { error: null, data: insertData as OrderInterface }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const changeStatus = async (req: ChangeOrderStatusRequest): Promise<Response<OrderInterface>> => {
  const { orderId, status } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error, data } = await supabase
      .from('orders')
      .update({
        status,
        ...(status === OrderStatusApiEnum.Delivered && { payment_status: PaymentStatusApiEnum.Completed })
      })
      .eq('id', orderId)
      .select()
      .single()

    return { error, data: data as OrderInterface }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}
