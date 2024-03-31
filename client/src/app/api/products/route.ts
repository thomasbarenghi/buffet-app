import { type PostgrestError } from '@supabase/supabase-js'
import { type Product } from '@/interfaces'
import { createProduct, getAllProducts } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'

export const GET = async () => {
  const { data, error } = await getAllProducts()
  if (error) generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const POST = async (req: Request) => {
  const product = (await req.json()) as Product
  const { error, data } = await createProduct(product)
  if (error) generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
