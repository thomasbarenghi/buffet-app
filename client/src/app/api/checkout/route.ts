import { type NextRequest } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { formatProductsToMp, generateErrorResponse } from '@/utils/functions'
import { clientUrl, mpAccessToken } from '@/utils/constants/env.const'
import { type GetPreferenceRequest } from '@/interfaces'

const client = new MercadoPagoConfig({ accessToken: mpAccessToken })

export const POST = async (req: NextRequest) => {
  try {
    const reqJson = (await req.json()) as GetPreferenceRequest
    const response = await new Preference(client).create({
      body: {
        items: formatProductsToMp(reqJson?.products),
        back_urls: {
          success: clientUrl + '/account?orderId=' + reqJson.orderData.id,
          failure: clientUrl + '/account?orderId=' + reqJson.orderData.id
        },
        auto_return: 'approved',
        payment_methods: {
          excluded_payment_types: [
            {
              id: 'ticket'
            }
          ]
        },
        notification_url: clientUrl + '/api/notification?orderId=' + reqJson.orderData.id
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
    return generateErrorResponse({ status: 500, error: { message: 'Internal Server Error', error } })
  }
}
