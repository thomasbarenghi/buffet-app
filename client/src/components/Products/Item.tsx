'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useDisclosure } from '@nextui-org/react'
import { truncateText } from '@/utils/functions'
import { type Role, type Product } from '@/interfaces'
const ModalProduct = dynamic(async () => await import('./Modal'))

interface Props {
  product: Product | undefined
  mode: Role
}

const ProductCardVert: React.FC<Props> = ({ product, mode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className='flex w-full cursor-pointer flex-col gap-3' onClick={onOpen}>
        <div className='relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100'>
          <Image
            src={product?.thumbnail ?? '/images/placeholder.png'}
            alt='image'
            width={250}
            height={250}
            priority
            placeholder='empty'
            className='h-full w-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-normal'>{product?.title}</h1>
            <p className='text-xs font-light text-zinc-700'>{truncateText(product?.description ?? '', 70)}</p>
          </div>
          <p className='text-small font-semibold'>${product?.price}</p>
        </div>
      </div>
      <ModalProduct product={product} isOpen={isOpen} mode={mode} onClose={onClose} />
    </>
  )
}

export default ProductCardVert
