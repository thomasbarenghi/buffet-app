import { type Product, type Response } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const deleteProduct = async (id: string): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()
  const { error } = await supabase.from('products').delete().eq('id', id)

  return {
    data: null,
    error
  }
}
