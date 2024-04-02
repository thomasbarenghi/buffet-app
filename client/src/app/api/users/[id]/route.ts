import { getUserProfile, patchUserProfile } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type PostgrestError } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { data, error } = await getUserProfile(params.id === 'null' ? undefined : params.id)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const jsonReq = await req.json()
  const { data, error } = await patchUserProfile(jsonReq, params.id)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
