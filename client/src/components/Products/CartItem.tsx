'use client'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import { ModalProduct } from '..'
import { useCartStore } from '@/context/zustand/cart.store'
import { useDisclosure } from '@nextui-org/react'
import { truncateText } from '@/utils/functions/truncateText'

interface Props {
  product: Product
  isLast: boolean
}

const ProductCartItem: FunctionComponent<Props> = ({ product, isLast }) => {
  const removeItem = useCartStore((state) => state.removeItem)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between gap-5   py-5 ${!isLast && 'border-b'} `}
        onClick={onOpen}
      >
        <div className='flex items-start gap-2'>
          <div className='relative aspect-square h-[80px] w-[80px] '>
            <Image
              src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt={product.title}
              fill
              className='aspect-square rounded-lg object-cover'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <h1 className='font-normal'>{product.title}</h1>
              <p className='text-xs font-light text-zinc-700'>{truncateText(product.description, 40)}</p>
            </div>
            <p className='text-small font-semibold'>${product.price}</p>
          </div>
        </div>
        <Image
          src={'/icons/cross-bold.svg'}
          alt='configuration'
          height={25}
          width={25}
          className='cursor-pointer'
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
