import { createUserProfile, getUserProfile, patchUserProfile } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'
import { type PostgrestError } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { data, error } = await getUserProfile(params.id === 'null' ? undefined : params.id)
  if (error) generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const POST = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const jsonReq = await req.json()
  const { data, error } = await createUserProfile(jsonReq, params.id)
  if (error) generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const jsonReq = await req.json()
  const { data, error } = await patchUserProfile(jsonReq, params.id)
  if (error) generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
