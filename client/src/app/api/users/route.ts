import { type NextRequest } from 'next/server'
import { type PostgrestError } from '@supabase/supabase-js'
import { createUserProfile } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const POST = async (req: NextRequest) => {
  const jsonReq = await req.json()
  const { data, error } = await createUserProfile(jsonReq)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
