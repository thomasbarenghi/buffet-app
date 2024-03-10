import { type Product } from '@/interfaces'
import { toast } from 'sonner'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CartState {
  items: Product[]
  addItem: (item: Product) => void
  removeItem: (item: string) => void
  cleanCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        console.log(item)
        set((state) => {
          if (state.items.includes(item)) {
            toast.info('Ya tienes este producto en el carrito')
            return state
          }

          toast.success('Producto agregado al carrito')
          return { items: [...state.items, item] }
        })
      },
      removeItem: (item) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== item) }))
      },
      cleanCart: () => {
        set({ items: [] })
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
