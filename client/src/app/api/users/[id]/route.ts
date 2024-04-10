import { type NextRequest } from 'next/server'
import { type PostgrestError } from '@supabase/supabase-js'
import { getUserProfile, patchUserProfile } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type PatchUserProfile } from '@/interfaces'

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { data, error } = await getUserProfile({ id: params.id === 'null' ? undefined : params.id })
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const body = (await req.json()) as PatchUserProfile
  const { data, error } = await patchUserProfile({ id: body.id, formData: body.formData })
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
