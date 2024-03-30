import { type Response, type Product } from '@/interfaces'
import { getRequest } from '../api.requests'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

export const arrayToFormattedString = (array: string[]) => {
  const formattedString = `(${array.map((item) => `"${item}"`).join(',')})`
  return formattedString
}

export const getAllItems = async (items: string[]): Promise<Response<Product[]>> => {
  const ids = arrayToFormattedString(items)

  const res = await getRequest<Product[]>({
    url: Endpoints.FIND_CART_PRODUCTS(ids, supabaseAnonApiKey),
    cache: 'force-cache'
  })

  return res
}
