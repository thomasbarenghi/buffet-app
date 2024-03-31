import { getUserOrders } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'
import { type PostgrestError } from '@supabase/supabase-js'

export const GET = async () => {
  const { data, error } = await getUserOrders('active')
  if (error) generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
