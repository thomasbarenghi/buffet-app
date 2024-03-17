import { getRequest } from '@/services/api.requests'
import { type Product, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

export const getProducts = async (): Promise<Response<Product[]>> => {
  const { error, data } = await getRequest<Product[]>({
    url: Endpoints.FIND_PRODUCTS(supabaseAnonApiKey),
    cache: 'no-store'
  })

  if (error) console.error(error)

  return {
    error,
    data
  }
}
