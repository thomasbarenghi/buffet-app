import { type PostgrestError } from '@supabase/supabase-js'
import { getOrders } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const GET = async () => {
  const { data, error } = await getOrders({ mode: 'shop', type: 'active' })
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
