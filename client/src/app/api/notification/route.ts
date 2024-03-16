import { OrderStatusApiEnum, PaymentStatusApiEnum } from '@/interfaces'
import { mpAccessToken } from '@/utils/constants/env.const'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// import MercadoPagoConfig, { Payment } from 'mercadopago'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  // const client = new MercadoPagoConfig({ accessToken: mpAccessToken })
  // const payment = new Payment(client)
  const searchParams = request.nextUrl.searchParams
  const topic = searchParams.get('topic') || searchParams.get('type')
  const orderId = searchParams.get('orderId')

  if (!orderId) throw Error()

  try {
    if (topic === 'payment') {
      const paymentId = searchParams.get('id') || searchParams.get('data.id')
      // const paymentRes = await payment.get({ id: paymentId ?? '' })
      // const paymentStatus = paymentRes.api_response.status

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
          .update({ payment_status: PaymentStatusApiEnum.Completed })
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
