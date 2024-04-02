import { type Product } from '@/interfaces'

export const formatProductsToMp = (products: Product[]) =>
  products.map((product: Product) => ({
    id: product.id,
    title: product.title,
    quantity: 1,
    unit_price: product.price
  }))
