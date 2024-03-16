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
import { ScrollShadow } from '@nextui-org/react'

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
    document.body.style.overflow = 'hidden'
    setIsOpen(true)
  }

  const handleClose = (): void => {
    document.body.style.overflow = ''
    setIsOpen(false)
  }

  const handleCheckout = (): void => {
    handleClose()
    router.push(routes.customer.CHECKOUT)
  }

  return (
    <>
      <div className='cursor-pointer rounded-full bg-orange-100 p-3' onClick={handleOpen}>
        <Image src='/icons/cart-orange.svg' alt='cart' width={20} height={20} />
      </div>
      {isOpen &&
        createPortal(
          <div className='fixed bottom-0 left-0 top-0 z-50 grid h-screen w-screen lg:grid-cols-[auto,_max(25%,_400px)]'>
            <div className='hidden h-auto w-auto bg-[#00000079] sm:w-full lg:flex ' onClick={handleClose}></div>
            <div className='flex h-screen w-full flex-col items-end justify-start gap-2 bg-white px-5 pb-24 pt-8 lg:pb-10'>
              <div className='flex w-full items-center justify-between'>
                <h2 className='text-xl font-semibold'>Carrito</h2>
                <div className='cursor-pointer p-2' onClick={handleClose}>
                  <Image src='/icons/cross.svg' alt='cross' width={18} height={18} />
                </div>
              </div>
              {products.length === 0 ? (
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
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default Cart
