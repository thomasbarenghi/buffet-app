import { getRequest } from '@/services/api.requests'
import { type Product, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { arrayToObject } from '@/utils/functions/arrayToObject'

export const getProduct = async (id: string): Promise<Response<Product>> => {
  const { data, error } = await getRequest<Product[]>({
    url: Endpoints.FIND_PRODUCT(id, supabaseAnonApiKey),
    cache: 'no-store'
  })

  if (error) console.error(error)

  return {
    error,
    data: arrayToObject<Product>(data ?? [])
  }
}
