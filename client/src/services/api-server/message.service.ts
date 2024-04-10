import 'server-only'
import { type GetOrderMessagesRequest, type CreateMessageRequest, type Message, type Response } from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateServiceError } from '@/utils/functions'

export const revalidate = 0

export const createMessage = async (req: CreateMessageRequest): Promise<Response<Message>> => {
  const { message, orderId } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const user = await supabase.auth.getUser()
    if (!user) return generateServiceError(400, 'Cant access current user')
    const { error, data } = await supabase
      .from('messages')
      .insert([
        {
          user_id: user.data.user?.id,
          order_id: orderId,
          message
        }
      ])
      .select()
      .single()

    return { error, data }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const getOrderMessages = async (req: GetOrderMessagesRequest): Promise<Response<any[]>> => {
  const { orderId } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
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
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}
