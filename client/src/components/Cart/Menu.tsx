'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import React, { useState, useEffect, type Dispatch, type SetStateAction } from 'react'
import { ScrollShadow } from '@nextui-org/react'
import { Button, ProductCartGrid } from '@/components'
import { getAllProducts } from '@/services/api-client'
import { useCartStore } from '@/context/zustand/cart.store'
import { routes } from '@/utils/constants'
import { type Product } from '@/interfaces'
import { motion } from 'framer-motion'
import { itemToIdArray } from '@/utils/functions'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  itemsFallback: Product[] | undefined
}

const CartMenu = ({ setIsOpen, itemsFallback }: Props) => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>(itemsFallback ?? [])
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    void handleUpdateCart()
  }, [items])

  const handleUpdateCart = async (): Promise<void> => {
    const products = await getAllProducts(itemToIdArray(items).join(','))
    setProducts(products.data ?? [])
  }

  const handleClose = (): void => {
    document.body.style.overflow = ''
    setIsOpen(false)
  }

  const handleCheckout = (): void => {
    handleClose()
    router.push(routes.customer.CHECKOUT)
  }

  return createPortal(
    <div className='fixed bottom-0 left-0 top-0 z-50 grid w-screen lg:grid-cols-[auto,_max(25%,_400px)]'>
      <div
        className='absolute left-0 top-0 z-0 hidden h-full w-full bg-[#00000079]  lg:flex '
        onClick={handleClose}
      ></div>
      <div className='hidden lg:flex'></div>
      <motion.div
        initial={{ opacity: 0, x: '100vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className='z-[1] flex h-full w-full flex-col items-end justify-start gap-2 overflow-hidden bg-white px-5 py-8 lg:pb-10'
      >
        <div className='flex w-full items-center justify-between'>
          <h2 className='text-xl font-semibold'>Carrito</h2>
          <div className='cursor-pointer p-2' onClick={handleClose}>
            <Image src='/icons/cross.svg' alt='cross' width={18} height={18} />
          </div>
        </div>

        {items.length === 0 ? (
          <div className='flex h-full w-full items-center justify-center '>
            <p className='text-center font-semibold'>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <ScrollShadow hideScrollBar className='flex w-full flex-grow flex-col '>
              <ProductCartGrid products={products} />
            </ScrollShadow>

            <div className='w-full'>
              <Button title='Ir a pagar' size='lg' radius='lg' fullWidth onClick={handleCheckout} />
            </div>
          </>
        )}
      </motion.div>
    </div>,
    document.body
  )
}

export default CartMenu
