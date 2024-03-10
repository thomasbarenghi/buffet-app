'use client'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import { Button, ModalProduct } from '..'
import { useCartStore } from '@/context/zustand/cart.store'
import { useDisclosure } from '@nextui-org/react'

interface Props {
  product: Product
}

const ProductCartItem: FunctionComponent<Props> = ({ product }) => {
  const removeItem = useCartStore((state) => state.removeItem)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className='flex cursor-pointer flex-col items-start gap-2 border-b  py-5' onClick={onOpen}>
        <div className='flex items-start gap-2'>
          <div className='relative aspect-square w-[60px] '>
            <Image
              src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt={product.title}
              fill
              className='aspect-square rounded-lg object-cover'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <div>
              <h3 className='text-sm font-semibold'>{product.title}</h3>
            </div>
            <p className='text-base font-semibold text-primary '>${product.price}</p>
          </div>
        </div>
        <Button
          title='Quitar'
          size='sm'
          variant='flat'
          onClick={() => {
            removeItem(product.id)
          }}
        />
      </div>
      <ModalProduct product={product} isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ProductCartItem
