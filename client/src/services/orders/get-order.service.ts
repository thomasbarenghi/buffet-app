import { getRequest } from '@/services/api.requests'
import { type OrderInterface, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

const arrayToObject = (array: OrderInterface[]): OrderInterface => {
  const object = {}

  array.forEach((item) => {
    Object.assign(object, item)
  })

  return object as OrderInterface
}

export const getOrder = async (id: string): Promise<Response<OrderInterface>> => {
  const response = await getRequest<OrderInterface[]>({
    url: Endpoints.FIND_ORDER(id, supabaseAnonApiKey),
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  const formated = {
    ...response,
    data: arrayToObject(response.data ?? [])
  }

  return formated
}
