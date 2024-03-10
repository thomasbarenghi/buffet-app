import type { NextRequest } from 'next/server'
// import { MercadoPagoConfig, Payment } from 'mercadopago'
// import { createClient } from '@supabase/supabase-js'
// import { mpAccessToken, serverUrl, supabaseAnonApiKey } from '@/utils/constants/env.const'

// const mercadopago = new MercadoPagoConfig({ accessToken: mpAccessToken })
// const supabase = createClient(serverUrl, supabaseAnonApiKey)

export const POST = async (request: NextRequest) => {
  // const body = await request.json().then((data) => data as { data: { id: string } })
  const body = await request.json()
  console.log(body)
  console.log(request.url)
  // const payment = await new Payment(mercadopago).get({ id: body.data.id })

  // const order: = {
  //   id: payment.id,
  //   amount: payment.transaction_amount,
  //   message: payment.description
  // }

  // await supabase.from('orders').insert(donation)

  return Response.json({ success: true })
}
