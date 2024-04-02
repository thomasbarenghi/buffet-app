import 'server-only'
import { type Response, type Shop } from '@/interfaces'
import { shopId } from '@/utils/constants/env.const'
import { arrayToObject } from '@/utils/functions'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getShopStatus = async (): Promise<Response<Shop>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase.from('shop_config').select().eq('id', shopId)

  return { error, data: arrayToObject<Shop>(data ?? []) }
}

export const changeShopStatus = async (isOpen: boolean): Promise<Response<Shop>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const { error, data } = await supabase
    .from('shop_config')
    .update({
      is_open: isOpen ?? false
    })
    .eq('id', 'b4a6e440-ef32-4748-ad30-6a5b010b1e30')
    .select()

  return { error, data: arrayToObject<Shop>(data ?? []) }
}
