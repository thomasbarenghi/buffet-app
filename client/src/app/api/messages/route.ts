import { type NextRequest } from 'next/server'
import { createMessage, getOrderMessages } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'

export const POST = async (req: Request) => {
  const body = await req.json()
  const { error, data } = await createMessage(body)
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const orderId = searchParams.get('orderId')

  if (!orderId) {
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

  const { data, error } = await getOrderMessages({ orderId })
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}
