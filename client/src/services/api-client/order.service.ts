import { type Response, type OrderStatusApiEnum, type Product, type OrderInterface } from '@/interfaces'
import { mutationRequest } from '../api.requests'
import { endpoints } from '@/utils/constants/endpoints.const'
import { clientUrl } from '@/utils/constants/env.const'

export const createOrder = async (products: Product[], instructions: string): Promise<Response<OrderInterface>> =>
  await mutationRequest<OrderInterface>({
    method: 'post',
    body: { products, instructions },
    path: endpoints.orders.CREATE_ONE,
    customUrl: clientUrl
  })

export const changeOrderStatus = async (status: OrderStatusApiEnum, id: string): Promise<Response<OrderInterface>> =>
  await mutationRequest<OrderInterface>({
    method: 'patch',
    body: { status },
    path: endpoints.orders.CHANGE_STATUS(id),
    customUrl: clientUrl
  })
