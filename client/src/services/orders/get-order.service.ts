import { getRequest } from '@/services/api.requests'
import { type OrderInterface, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { arrayToObject } from '@/utils/functions/arrayToObject'

export const getOrder = async (id: string): Promise<Response<OrderInterface>> => {
  const { error, data } = await getRequest<OrderInterface[]>({
    url: Endpoints.FIND_ORDER(id, supabaseAnonApiKey),
    cache: 'no-store'
  })

  if (error) console.error(error)

  return {
    error,
    data: arrayToObject<OrderInterface>(data ?? [])
  }
}
