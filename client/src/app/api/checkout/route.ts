import { type Product } from '@/interfaces'
import { clientUrl, mpAccessToken } from '@/utils/constants/env.const'
import { formatProductsToMp } from '@/utils/functions/formatProductsToMp'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { type NextRequest } from 'next/server'

const client = new MercadoPagoConfig({ accessToken: mpAccessToken })

export const POST = async (req: NextRequest) => {
  try {
    const reqJson = await req.json()
    const response = await new Preference(client).create({
      body: {
        items: formatProductsToMp(reqJson?.products as Product[]),
        back_urls: {
          success: clientUrl + '/success',
          failure: clientUrl + '/failure'
        },
        auto_return: 'approved',
        payment_methods: {
          excluded_payment_types: [
            {
              id: 'ticket'
            }
          ]
        },
        notification_url: clientUrl + '/api/notification?orderId=' + reqJson.orderId
      }
    })

    return new Response(JSON.stringify({ url: response.init_point }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        error
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
