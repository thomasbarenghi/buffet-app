import { OrderStatusApiEnum, PaymentStatusApiEnum, type Product } from '@/interfaces'
import { generateRandomNumber } from '@/utils/functions/generateRandomNumber'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createOrder = async (products: Product[], instructions: string): Promise<string> => {
  const supabase = createClientComponentClient<Database>()
  const user = await supabase.auth.getUser()
  const totalPrice = products.reduce((sum, item) => sum + item.price, 0)

  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        total_price: totalPrice,
        customer_id: user.data.user?.id ?? '',
        instructions,
        status: OrderStatusApiEnum.PendingPayment,
        payment_status: PaymentStatusApiEnum.Pending,
        code: generateRandomNumber()
      }
    ])
    .select()

  if (error) throw new Error()

  for (const iterator of products) {
    const { error: errorI } = await supabase
      .from('orders_products')
      .insert([{ order_id: data[0].id, product_id: iterator.id }])
      .select()

    if (errorI) throw new Error()
  }

  return data[0].id
}
