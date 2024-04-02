import { type NextRequest } from 'next/server'
import { type PostgrestError } from '@supabase/supabase-js'
import { changeShopStatus } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const jsonReq = await req.json()
  const { data, error } = await changeShopStatus(jsonReq.isOpen)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
