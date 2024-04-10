import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { revalidateCartPage } from './revalidateCartPage'
import { type CartItem } from '@/interfaces'
import { itemToIdArray } from '@/utils/functions'

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (item: string) => void
  cleanCart: () => void
  addUnit: (item: string) => void
  subtractUnit: (item: string) => void
  // updateItem: (oldItem: string, newItem: string) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const isItemInCart = state.items.some((cartItem) => cartItem.id === item.id)

          if (isItemInCart) {
            toast.info('Ya tienes este producto en el carrito')
            return state
          }

          const updatedItems = [...state.items, item]
          Cookies.set('cartItems', itemToIdArray(updatedItems).join(','), { expires: 100 })
          toast.success('Producto agregado al carrito')
          revalidateCartPage()
          return { items: updatedItems }
        })
      },
      removeItem: (item) => {
        const items = Cookies.get('cartItems')
          ?.split(',')
          .filter((i) => i !== item)

        Cookies.set('cartItems', items?.join(',') ?? '', { expires: 100 })
        revalidateCartPage()
        set((state) => ({ items: state.items.filter((i) => i.id !== item) }))
      },
      cleanCart: () => {
        Cookies.set('cartItems', '', { expires: 100 })
        revalidateCartPage()
        set({ items: [] })
      },
      addUnit: (item) => {
        set((state) => {
          const index = state.items.findIndex((cartItem) => cartItem.id === item)

          if (index !== -1) {
            const updatedItems = [...state.items]
            updatedItems[index].quantity = updatedItems[index].quantity + 1
            Cookies.set('cartItems', itemToIdArray(updatedItems).join(','), { expires: 100 })
            return { items: updatedItems }
          }
          toast.error('No se encontró el item')
          return state
        })
      },
      subtractUnit: (item) => {
        set((state) => {
          const index = state.items.findIndex((cartItem) => cartItem.id === item)

          if (index !== -1) {
            const updatedItems = [...state.items]
            if (updatedItems[index].quantity > 1) {
              updatedItems[index].quantity = updatedItems[index].quantity - 1
            }
            Cookies.set('cartItems', itemToIdArray(updatedItems).join(','), { expires: 100 })
            return { items: updatedItems }
          }
          toast.error('No se encontró el item')
          return state
        })
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
