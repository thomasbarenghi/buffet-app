import { type Response, type Message, type CreateMessageRequest } from '@/interfaces'
import { mutationRequest } from '../api.requests'
import { clientUrl } from '@/utils/constants/env.const'
import { endpoints } from '@/utils/constants'

export const createMessage = async (req: CreateMessageRequest): Promise<Response<Message>> =>
  await mutationRequest<Message>({
    method: 'post',
    body: req,
    path: endpoints.messages.CREATE_ONE,
    customUrl: clientUrl
  })
