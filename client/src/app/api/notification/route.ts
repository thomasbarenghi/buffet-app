import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { mpAccessToken } from '@/utils/constants/env.const'
import { OrderStatusApiEnum, PaymentStatusApiEnum } from '@/interfaces'

export const POST = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const searchParams = request.nextUrl.searchParams
  const topic = searchParams.get('topic') || searchParams.get('type')
  const orderId = searchParams.get('orderId')

  if (!orderId) throw Error()

  try {
    if (topic === 'payment') {
      const paymentId = searchParams.get('id') || searchParams.get('data.id')

      const response = await fetch('https://api.mercadopago.com/v1/payments/' + paymentId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + mpAccessToken
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }

      const data = await response.json()

      if (data.status === 'approved') {
        await supabase
          .from('orders')
          .update({ payment_status: PaymentStatusApiEnum.Completed, status: OrderStatusApiEnum.PendingApproval })
          .eq('id', orderId)
          .select()
      } else {
        await supabase
          .from('orders')
          .update({ payment_status: PaymentStatusApiEnum.Failure, status: OrderStatusApiEnum.Canceled })
          .eq('id', orderId)
          .select()
      }

      return new Response(data, {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      return new Response(JSON.stringify({ message: 'Invalid topic' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Internal Server Error', error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
