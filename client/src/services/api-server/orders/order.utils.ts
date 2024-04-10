import { type OrderInterface, type OrderQueryParams, OrderStatusApiEnum, type Response } from '@/interfaces'
import { generateServiceError } from '@/utils/functions'

const productsCustomerTemplate = `
*,
customer: profiles ( * ),
products: orders_products ( quantity, product: products (*) )
`

const statusActive = [
  OrderStatusApiEnum.InProgress,
  OrderStatusApiEnum.PendingApproval,
  OrderStatusApiEnum.PendingDelivery,
  OrderStatusApiEnum.PendingPreparation
]

const statusFinished = [OrderStatusApiEnum.Delivered, OrderStatusApiEnum.Canceled]

export const getAllOrders = async (params: OrderQueryParams): Promise<Response<OrderInterface[]>> => {
  const { supabase, userId, type } = params

  try {
    let query = supabase.from('orders').select(productsCustomerTemplate).order('created_at', { ascending: false })

    if (userId) query = query.eq('customer_id', userId)
    if (type === 'active') query = query.in('status', statusActive)
    if (type === 'finished') query = query.in('status', statusFinished)

    const { data, error } = await query

    return { data, error }
  } catch (error) {
    return generateServiceError(500, 'Internal Server Error')
  }
}
