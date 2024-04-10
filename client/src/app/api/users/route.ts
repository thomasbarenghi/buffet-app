import { type NextRequest } from 'next/server'
import { createUserProfile } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const POST = async (req: NextRequest) => {
  const jsonReq = await req.json()
  const { data, error } = await createUserProfile(jsonReq)
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}
