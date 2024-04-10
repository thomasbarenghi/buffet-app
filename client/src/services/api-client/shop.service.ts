import { type Shop, type Response, type ChangeShopStatusRequest } from '@/interfaces'
import { mutationRequest } from '../api.requests'
import { endpoints } from '@/utils/constants'
import { clientUrl } from '@/utils/constants/env.const'

export const changeShopStatus = async (req: ChangeShopStatusRequest): Promise<Response<Shop>> =>
  await mutationRequest<Shop>({
    method: 'patch',
    body: req,
    path: endpoints.shops.CHANGE_STATUS,
    customUrl: clientUrl
  })
