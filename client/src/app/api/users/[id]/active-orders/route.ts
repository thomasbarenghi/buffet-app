import { getOrders } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const GET = async () => {
  const { data, error } = await getOrders({ mode: 'user', type: 'active' })
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}
