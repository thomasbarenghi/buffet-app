import { changeShopStatus } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'
import { type PostgrestError } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const jsonReq = await req.json()
    const { data, error } = await changeShopStatus(jsonReq.isOpen)
    if (error) generateErrorResponse(error as PostgrestError)
    return Response.json(data)
  } catch (error) {
    console.log(error)
    return new Response('Error', {
      status: 500
    })
  }
}
