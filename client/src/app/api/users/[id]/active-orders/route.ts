import { type PostgrestError } from '@supabase/supabase-js'
import { getUserOrders } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const GET = async () => {
  const { data, error } = await getUserOrders('active')
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
