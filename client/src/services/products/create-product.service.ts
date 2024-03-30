import { type Product, type Response, type ProductFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getProductImageLink } from './getProductImageLink.service'

export const createProduct = async (product: ProductFormData): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()
  const image = await getProductImageLink(product)
  console.log(image)

  const { error } = await supabase
    .from('products')
    .insert([
      {
        title: product.title,
        description: product.description,
        price: product.price,
        ...(image?.data?.url && { thumbnail: image?.data?.url })
      }
    ])
    .select()

  return {
    data: null,
    error
  }
}
