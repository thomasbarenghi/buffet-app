import { type Response } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createMessage = async (orderId: string, message: string): Promise<Response<null>> => {
  const supabase = createClientComponentClient<Database>()
  const user = await supabase.auth.getUser()

  const { error } = await supabase
    .from('messages')
    .insert([
      {
        user_id: user.data.user?.id ?? '',
        order_id: orderId,
        message
      }
    ])
    .select()

  return { error, data: null }
}
