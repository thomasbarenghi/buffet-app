import { type Product, type Response } from '@/interfaces'
import { shopId } from '@/utils/constants/env.const'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const changeOrderStatus = async (isOpen: boolean): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()

  const { error } = await supabase
    .from('shop_config')
    .update({
      is_open: isOpen
    })
    .eq('id', shopId)
    .select()

  return {
    data: null,
    error
  }
}
