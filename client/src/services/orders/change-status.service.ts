import { type OrderInterface, type Response, type OrderStatusApiEnum } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const changeStatus = async (status: OrderStatusApiEnum, id: string): Promise<Response<OrderInterface>> => {
  const supabase = createClientComponentClient<Database>()
  const { error } = await supabase.from('orders').update({ status }).eq('id', id).select()
  return { data: null, error }
}
