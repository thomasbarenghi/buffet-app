import { type Product, type Response, type ProductFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createProduct = async (product: ProductFormData): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        title: product.title,
        description: product.description,
        price: product.price
      }
    ])
    .select()

  if (data === null) {
    throw new Error()
  }

  return {
    data: data[0],
    error
  }
}
