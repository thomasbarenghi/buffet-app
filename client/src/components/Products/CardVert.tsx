'use client'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import ModalProduct from './Modal'
import { useDisclosure } from '@nextui-org/react'
import { truncateText } from '@/utils/functions/truncateText'

interface Props {
  product: Product
}

const ProductCardVert = ({ product }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <div className='flex w-full cursor-pointer flex-col gap-3' onClick={onOpen}>
        <div className='relative aspect-square w-full'>
          <Image
            src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='picture'
            fill
            className='rounded-2xl object-cover'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-normal'>{product.title}</h1>
            <p className='text-xs font-light text-zinc-700'>{truncateText(product.description, 70)}</p>
          </div>
          <p className='text-small font-semibold'>${product.price}</p>
        </div>
      </div>
      <ModalProduct product={product} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
export default ProductCardVert
