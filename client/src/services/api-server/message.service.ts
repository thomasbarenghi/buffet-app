import 'server-only'
import { type Message, type Response } from '@/interfaces'
import { arrayToObject } from '@/utils/functions/arrayToObject'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createMessage = async (orderId: string, message: string): Promise<Response<Message>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()

  const { error, data } = await supabase
    .from('messages')
    .insert([
      {
        user_id: user.data.user?.id ?? '',
        order_id: orderId,
        message
      }
    ])
    .select()

  return { error, data: arrayToObject<any>(data ?? []) }
}

export const getOrderMessages = async (orderId: string): Promise<Response<any[]>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase
    .from('messages')
    .select(
      `
  *,
  user:profiles(*)
  `
    )
    .eq('order_id', orderId)

  return { error, data }
}
