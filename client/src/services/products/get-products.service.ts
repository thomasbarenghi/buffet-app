import { getRequest } from '@/services/api.requests'
import { type Product, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

export const getProducts = async (): Promise<Response<Product[]>> => {
  const response = await getRequest<Product[]>({
    url: Endpoints.FIND_PRODUCTS(supabaseAnonApiKey!),
    cache: 'no-store'
  })

  if (response?.error) {
    console.error(response?.error)
  }

  return response
}
