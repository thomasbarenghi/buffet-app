import { OrderStatusApiEnum, PaymentStatusApiEnum, type Product } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

export const createOrder = async (products: Product[], instructions: string) => {
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
        status: OrderStatusApiEnum.PendingApproval,
        payment_status: PaymentStatusApiEnum.Pending
      }
    ])
    .select()

  if (error || data === null) {
    toast.error('Algo salió mal')
    return
  }
  const order = data[0]

  for (const iterator of products) {
    const { error: errorI } = await supabase
      .from('orders_products')
      .insert([{ order_id: order.id, product_id: iterator.id }])
      .select()
    console.log(errorI)
    if (errorI) {
      toast.error('Algo salió mal')
      return
    }
  }

  return order.id
}
