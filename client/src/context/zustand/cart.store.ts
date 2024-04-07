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
          // Verificar si el producto ya está en el carrito
          const isItemInCart = state.items.some((cartItem) => cartItem === item)

          if (isItemInCart) {
            console.log('Producto ya en el carrito:', item)
            toast.info('Ya tienes este producto en el carrito')
            return state // No realizar cambios en el estado si el producto ya está en el carrito
          }

          // Agregar el producto al carrito
          const updatedItems = [...state.items, item]
          Cookies.set('cartItems', updatedItems.join(','), { expires: 100 })
          toast.success('Producto agregado al carrito')
          revalidateCartPage() // Actualizar la página del carrito si es necesario
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
