import { type Response, type Message } from '@/interfaces'
import { mutationRequest } from '../api.requests'
import { clientUrl } from '@/utils/constants/env.const'
import { endpoints } from '@/utils/constants'

export const createMessage = async (orderId: string, message: string): Promise<Response<Message>> =>
  await mutationRequest<Message>({
    method: 'post',
    body: { orderId, message },
    path: endpoints.messages.CREATE_ONE,
    customUrl: clientUrl
  })
