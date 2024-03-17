import { type Product, type Response, type ProductFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createProduct = async (product: ProductFormData): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()

  const { error } = await supabase
    .from('products')
    .insert([
      {
        title: product.title,
        description: product.description,
        price: product.price
      }
    ])
    .select()

  return {
    data: null,
    error
  }
}
