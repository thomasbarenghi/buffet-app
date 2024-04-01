import { type PostgrestError } from '@supabase/supabase-js'
import { type Product } from '@/interfaces'
import { createProduct, getAllProducts } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'
import { type NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('ids')
  const ids = query?.split(',') ?? null
  const { data, error } = await getAllProducts(ids)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const POST = async (req: Request) => {
  const product = (await req.json()) as Product
  const { error, data } = await createProduct(product)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
