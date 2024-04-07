'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { type Product } from '@/interfaces'
const CartMenu = dynamic(async () => await import('./Menu'))

interface Props {
  itemsFallback: Product[] | undefined
}

const Cart = ({ itemsFallback }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = async (): Promise<void> => {
    document.body.style.overflow = 'hidden'
    setIsOpen(true)
  }

  return (
    <>
      <div className='cursor-pointer rounded-full bg-orange-100 p-3' onClick={handleOpen}>
        <Image src='/icons/cart-orange.svg' alt='cart' className='min-w-[20px]' width={20} height={20} />
      </div>
      {isOpen && <CartMenu setIsOpen={setIsOpen} itemsFallback={itemsFallback} />}
    </>
  )
}

export default Cart
