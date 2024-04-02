import { type NextRequest } from 'next/server'
import { type PostgrestError } from '@supabase/supabase-js'
import { createMessage, getOrderMessages } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const POST = async (req: Request) => {
  const { orderId, message } = await req.json()
  const { error, data } = await createMessage(orderId, message)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('orderId')

  if (!query) {
    return Response.json(
      { message: 'Missing orderId' },
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  const { data, error } = await getOrderMessages(query)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json(data)
}
