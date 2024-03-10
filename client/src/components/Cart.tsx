/* eslint-disable multiline-ternary */
'use client'
import { useState, type FunctionComponent, useEffect } from 'react'
import { Button, ProductCartGrid } from '@/components'
import { createPortal } from 'react-dom'
import { useCartStore } from '@/context/zustand/cart.store'
import { type Product } from '@/interfaces'
import { getAllItems } from '@/services/cart/get-items.service'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import Image from 'next/image'

const Cart: FunctionComponent = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const items = useCartStore((state) => state.items)

  useEffect(() => {
    void handleUpdateCart()
  }, [items])

  const handleUpdateCart = async (): Promise<void> => {
    const products = await getAllItems(items)
    setProducts(products)
  }

  const handleOpen = async (): Promise<void> => {
    await handleUpdateCart()
    setIsOpen(true)
  }

  const handleClose = (): void => {
    setIsOpen(false)
  }

  const handleCheckout = (): void => {
    router.push(routes.customer.CHECKOUT)
  }

  return (
    <>
      <div className='cursor-pointer rounded-full bg-orange-100 p-3'>
        <Image src='/icons/cart-orange.svg' alt='cart' width={20} height={20} onClick={handleOpen} />
      </div>
      {isOpen &&
        createPortal(
          <div className='fixed left-0 top-0 z-50 flex h-screen w-screen flex-row items-end justify-start '>
            <div className='h-full w-auto bg-[#00000079] sm:w-full ' onClick={handleClose}></div>
            <div className='flex h-full w-full flex-col items-end justify-start gap-2 bg-white px-5 pb-10  pt-5 sm:w-[350px] sm:min-w-[350px]'>
              <div className='absolute right-2 top-2 cursor-pointer p-2' onClick={handleClose}>
                <Image src='/icons/cross.svg' alt='cross' width={18} height={18} />
              </div>
              {products.length === 0 ? (
                <div className='flex h-full w-full items-center justify-center '>
                  <p className='text-center font-semibold'>Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className='flex w-full flex-grow flex-col overflow-hidden'>
                    <h2 className='text-xl font-semibold'>Carrito</h2>
                    <div className='max-h-auto overflow-y-scroll'>
                      <ProductCartGrid products={products} />
                    </div>
                  </div>
                  <div className='w-full'>
                    <Button title='Ir a pagar' fullWidth onClick={handleCheckout} />
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Cart
