import { type Product } from '@/interfaces'
import { getProduct } from '../products/get-product.service'

export const getAllItems = async (items: Product[]): Promise<Product[]> => {
  const ids = items.map((item) => item.id)
  const res = await Promise.all(
    ids.map(async (item) => {
      const { data: product } = await getProduct(item)
      if (!product) return null
      return product
    })
  )

  console.log(res)

  return res.filter((product): product is Product => product !== null)
}
