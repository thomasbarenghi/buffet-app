import { getRequest } from '@/services/api.requests'
import { type Product, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

const arrayToObject = (array: Product[]): Product => {
  const object = {}

  array.forEach((item) => {
    Object.assign(object, item)
  })

  return object as Product
}

export const getProduct = async (id: string): Promise<Response<Product>> => {
  const response = await getRequest<Product[]>({
    url: Endpoints.FIND_PRODUCT(id, supabaseAnonApiKey),
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
