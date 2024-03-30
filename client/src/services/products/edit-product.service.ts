import { type Product, type Response, type ProductFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getProductImageLink } from './getProductImageLink.service'

export const editProduct = async (product: ProductFormData, id: string): Promise<Response<Product>> => {
  const supabase = createClientComponentClient<Database>()
  const image = await getProductImageLink(product)
  console.log(image)

  const { error } = await supabase
    .from('products')
    .update({
      ...(product.title && { title: product.title }),
      ...(product.description && { description: product.description }),
      ...(product.price && { price: product.price }),
      ...(image?.data?.url && { thumbnail: image?.data?.url })
    })
    .eq('id', id)
    .select()

  return {
    data: null,
    error
  }
}
