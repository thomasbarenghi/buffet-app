import { type PostgrestError } from '@supabase/supabase-js'
import { changeStatus } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const { status } = await req.json()
  const { data, error } = await changeStatus(status, params.id)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json({ data })
}
