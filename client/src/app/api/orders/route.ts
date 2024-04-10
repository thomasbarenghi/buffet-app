import { type PostgrestError } from '@supabase/supabase-js'
import { changeStatus, createOrder } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type ChangeOrderStatusRequest, type CreateOrderRequest } from '@/interfaces'

export const POST = async (req: Request) => {
  const body = (await req.json()) as CreateOrderRequest
  const { error, data } = await createOrder(body)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const PATCH = async (req: Request) => {
  const body = (await req.json()) as ChangeOrderStatusRequest
  const { data, error } = await changeStatus(body)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json({ data })
}
