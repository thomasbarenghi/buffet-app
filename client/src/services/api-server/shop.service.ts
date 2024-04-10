import 'server-only'
import { type ChangeShopStatusRequest, type Response, type Shop } from '@/interfaces'
import { shopId } from '@/utils/constants/env.const'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateServiceError } from '@/utils/functions'

export const revalidate = 0

export const getShopStatus = async (): Promise<Response<Shop>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { data, error } = await supabase.from('shop_config').select().eq('id', shopId).single()
    return { error, data }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const changeShopStatus = async (req: ChangeShopStatusRequest): Promise<Response<Shop>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error, data } = await supabase
      .from('shop_config')
      .update({
        is_open: req.isOpen ?? false
      })
      .eq('id', shopId)
      .select()
      .single()

    return { error, data }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}
