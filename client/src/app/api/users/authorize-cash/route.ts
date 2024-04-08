import { authorizeCash } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type PostgrestError } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

export const PATCH = async (req: NextRequest) => {
  const jsonReq = await req.json()
  const { data, error } = await authorizeCash(jsonReq)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
