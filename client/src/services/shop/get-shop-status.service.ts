import { getRequest } from '@/services/api.requests'
import { type Shop, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { arrayToObject } from '@/utils/functions/arrayToObject'

export const getShopStatus = async (): Promise<Response<Shop>> => {
  const { error, data } = await getRequest<Shop[]>({
    url: Endpoints.FIND_SHOP_STATUS(supabaseAnonApiKey),
    cache: 'no-store'
  })

  if (error) console.error(error)

  return {
    error,
    data: arrayToObject<Shop>(data ?? [])
  }
}
