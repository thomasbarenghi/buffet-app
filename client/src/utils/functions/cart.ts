import { type CartItem } from '@/interfaces'

export const findCartItem = (items: CartItem[], item: string) => items.find((cartItem) => cartItem.id === item)

export const itemToIdArray: (item: CartItem | CartItem[]) => string[] = (item) => {
  if (Array.isArray(item)) {
    return item.map((subItem) => subItem.id)
  } else {
    return item?.id ? [item.id] : []
  }
}

export const calculateFinalPrice = (items: CartItem[]) => {
  let total = 0

  // Recorremos los items del carrito
  for (const item of items) {
    // Acumulamos el precio total multiplicando la cantidad por el precio unitario
    total += item.quantity * item.price
  }

  return total
}
