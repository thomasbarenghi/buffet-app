import { type Product, type Response, type ProductFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const editProduct = async (product: ProductFormData, id: string): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()

  const { data, error } = await supabase
    .from('products')
    .update({
      ...(product.title && { title: product.title }),
      ...(product.description && { description: product.description }),
      ...(product.price && { price: product.price })
    })
    .eq('id', id)
    .select()

  console.log(error, data)

  if (data === null) {
    throw new Error()
  }

  return {
    data: data[0],
    error
  }
}
