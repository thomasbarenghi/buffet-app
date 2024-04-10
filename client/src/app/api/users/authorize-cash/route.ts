import { authorizeCash } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type NextRequest } from 'next/server'

export const PATCH = async (req: NextRequest) => {
  const jsonReq = await req.json()
  const { data, error } = await authorizeCash(jsonReq)
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}
