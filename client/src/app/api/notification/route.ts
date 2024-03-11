import { PaymentStatusApiEnum } from '@/interfaces'
import { mpAccessToken } from '@/utils/constants/env.const'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import MercadoPagoConfig, { Payment } from 'mercadopago'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export const POST = async (request: NextRequest) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const client = new MercadoPagoConfig({ accessToken: mpAccessToken })
  const payment = new Payment(client)
  const searchParams = request.nextUrl.searchParams
  const topic = searchParams.get('topic') || searchParams.get('type')
  const orderId = searchParams.get('orderId')

  if (!orderId) throw Error()

  try {
    if (topic === 'payment') {
      const paymentId = searchParams.get('id') || searchParams.get('data.id')
      const paymentRes = await payment.get({ id: paymentId ?? '' })
      const paymentStatus = paymentRes.api_response.status

      await supabase
        .from('orders')
        .update({ payment_status: PaymentStatusApiEnum.Completed })
        .eq('id', orderId)
        .select()

      return new Response(JSON.stringify({ payment, paymentStatus }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } else {
      await supabase.from('orders').update({ payment_status: PaymentStatusApiEnum.Failure }).eq('id', orderId).select()

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

// const body = await request.json().then((data) => data as { data: { id: string } })
//   const body = await request.json()
//   // const payment = await new Payment(mercadopago).get({ id: body.data.id })

//   // const order: = {
//   //   id: payment.id,
//   //   amount: payment.transaction_amount,
//   //   message: payment.description
//   // }

//   // await supabase.from('orders').insert(donation)

//   return Response.json({ success: true, order: body.orderId })
// }
