'use client'
import { type Role, type Product } from '@/interfaces'
import Image from 'next/image'
import { type FunctionComponent } from 'react'
import { useCartStore } from '@/context/zustand/cart.store'
import { useDisclosure } from '@nextui-org/react'
import { truncateText } from '@/utils/functions/truncateText'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const ModalProduct = dynamic(async () => await import('./Modal'))

interface Props {
  product: Product
  isLast: boolean
  withBg?: boolean
  mode: Role
}

const ProductCartItem: FunctionComponent<Props> = ({ product, isLast, withBg = false, mode }) => {
  const removeItem = useCartStore((state) => state.removeItem)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between gap-5 ${withBg && 'rounded-xl border bg-white !py-3 px-3'}  py-5 ${!isLast && !withBg && 'border-b'} `}
        onClick={onOpen}
      >
        <div className='flex items-center gap-3'>
          <div className='relative aspect-square h-[80px] w-[80px] '>
            <Image
              src={product.thumbnail}
              priority
              alt={product.title}
              fill
              placeholder='empty'
              className='aspect-square rounded-lg object-cover'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
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
          onClick={(e) => {
            e.stopPropagation()
            removeItem(product.id)
            router.refresh()
          }}
        />
      </div>
      <ModalProduct product={product} isOpen={isOpen} mode={mode} onClose={onClose} />
    </>
  )
}

export default ProductCartItem
