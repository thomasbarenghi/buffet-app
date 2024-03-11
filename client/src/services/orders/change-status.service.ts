import { type OrderStatusApiEnum } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

export const changeStatus = async (status: OrderStatusApiEnum, id: string) => {
  const supabase = createClientComponentClient<Database>()
  const { error, data: res } = await supabase.from('orders').update({ status }).eq('id', id).select()

  if (error || res === null) {
    toast.error('Algo salió mal')
    throw new Error()
  }

  return res
}
