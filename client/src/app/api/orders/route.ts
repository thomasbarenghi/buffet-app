import { createOrder } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type PostgrestError } from '@supabase/supabase-js'

export const POST = async (req: Request) => {
  const { products, instructions } = await req.json()
  const { error, data } = await createOrder(products, instructions)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
