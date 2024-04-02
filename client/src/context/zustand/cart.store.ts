import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { revalidateCartPage } from './revalidateCartPage'

interface CartState {
  items: string[]
  addItem: (item: string) => void
  removeItem: (item: string) => void
  cleanCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, _get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          if (state.items.includes(item)) {
            toast.info('Ya tienes este producto en el carrito')
            return state
          }

          const updatedItems = [...state.items, item]
          Cookies.set('cartItems', updatedItems.join(','), { expires: 100 })
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
        set((state) => ({ items: state.items.filter((i) => i !== item) }))
      },
      cleanCart: () => {
        Cookies.set('cartItems', '', { expires: 100 })
        revalidateCartPage()
        set({ items: [] })
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
