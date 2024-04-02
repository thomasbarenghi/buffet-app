import { changeShopStatus } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type PostgrestError } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const jsonReq = await req.json()
  const { data, error } = await changeShopStatus(jsonReq.isOpen)
  console.log(error, data)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
