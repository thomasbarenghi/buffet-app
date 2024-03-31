import { type Shop, type Response } from '@/interfaces'
import { mutationRequest } from '../api.requests'
import { endpoints } from '@/utils/constants/endpoints.const'
import { clientUrl } from '@/utils/constants/env.const'

export const changeShopStatus = async (isOpen: boolean): Promise<Response<Shop>> =>
  await mutationRequest<Shop>({
    method: 'patch',
    body: { isOpen },
    path: endpoints.shops.CHANGE_STATUS,
    customUrl: clientUrl
  })
