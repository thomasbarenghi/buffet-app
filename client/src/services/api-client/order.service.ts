import {
  type Response,
  type OrderInterface,
  type CreateOrderRequest,
  type ChangeOrderStatusRequest
} from '@/interfaces'
import { mutationRequest } from '../api.requests'
import { endpoints } from '@/utils/constants'
import { clientUrl } from '@/utils/constants/env.const'

export const createOrder = async (req: CreateOrderRequest): Promise<Response<OrderInterface>> =>
  await mutationRequest<OrderInterface>({
    method: 'post',
    body: req,
    path: endpoints.orders.CREATE_ONE,
    customUrl: clientUrl
  })

export const changeOrderStatus = async (req: ChangeOrderStatusRequest): Promise<Response<OrderInterface>> =>
  await mutationRequest<OrderInterface>({
    method: 'patch',
    body: req,
    path: endpoints.orders.CHANGE_STATUS,
    customUrl: clientUrl
  })
