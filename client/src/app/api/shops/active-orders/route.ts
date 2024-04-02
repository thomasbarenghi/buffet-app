import { type PostgrestError } from '@supabase/supabase-js'
import { getShopOrders } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const GET = async () => {
  const { data, error } = await getShopOrders('active')
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
