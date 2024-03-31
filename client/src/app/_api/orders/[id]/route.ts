import { changeStatus } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'
import { type PostgrestError } from '@supabase/supabase-js'

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { status } = await req.json()
    const { data, error } = await changeStatus(status, params.id)
    if (error) generateErrorResponse(error as PostgrestError)
    return Response.json({ data })
  } catch (error) {
    console.log(error)
    return new Response('Error', {
      status: 500
    })
  }
}
