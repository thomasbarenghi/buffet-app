import { type CartItem } from '@/interfaces'

export const formatProductsToMp = (products: CartItem[]) =>
  products.map((product: CartItem) => ({
    id: product.id,
    title: `x${product.quantity} ${product.title} `,
    quantity: product.quantity,
    unit_price: product.price
  }))
