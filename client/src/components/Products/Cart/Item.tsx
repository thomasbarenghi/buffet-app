'use client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Button, useDisclosure } from '@nextui-org/react'
import { useCartStore } from '@/context/zustand/cart.store'
import { type Role, type Product } from '@/interfaces'
import { findCartItem } from '@/utils/functions'

const ModalProduct = dynamic(async () => await import('../Modal'))

interface Props {
  product: Product | undefined
  isLast: boolean
  withBg?: boolean
  mode: Role
}

const ProductCartItem = ({ product, isLast, withBg = false, mode }: Props) => {
  const removeItem = useCartStore((state) => state.removeItem)
  const items = useCartStore((state) => state.items)
  const addUnit = useCartStore((state) => state.addUnit)
  const subtractUnit = useCartStore((state) => state.subtractUnit)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const quantity = findCartItem(items, product?.id ?? '')?.quantity ?? 1
  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between gap-5 ${withBg && 'rounded-xl border bg-white !py-3 px-3'}  py-5 ${!isLast && !withBg && 'border-b'} `}
        onClick={onOpen}
      >
        <div className='flex items-center gap-3'>
          <div className='relative aspect-square h-[80px] w-[80px] '>
            <Image
              src={product?.thumbnail ?? '/images/placeholder.png'}
              priority
              alt={product?.title ?? 'image'}
              fill
              placeholder='empty'
              className='aspect-square rounded-lg object-cover'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col'>
              <h1 className='font-light'>{product?.title}</h1>
              {/* <p className='text-xs font-light text-zinc-700'>{truncateText(product?.description ?? '', 40)}</p> */}
              <p className='text-small font-semibold'>${product?.price} C/U</p>
            </div>
            <div className='flex w-max items-center justify-center gap-3'>
              <Button
                isIconOnly
                radius='full'
                className='h-6 w-6'
                size='sm'
                color='primary'
                variant='flat'
                disabled={quantity <= 1}
                onClick={() => {
                  if (!product) return
                  subtractUnit(product?.id)
                }}
              >
                -
              </Button>
              <p className='text-sm font-semibold leading-none'>{quantity}</p>
              <Button
                isIconOnly
                radius='full'
                size='sm'
                color='primary'
                className='h-6 w-6'
                variant='flat'
                onClick={() => {
                  if (!product) return
                  addUnit(product?.id)
                }}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <Image
          src={'/icons/trash.svg'}
          alt='configuration'
          height={20}
          width={20}
          className='cursor-pointer'
          onClick={(e) => {
            e.stopPropagation()
            if (!product) return
            removeItem(product?.id)
            router.refresh()
          }}
        />
      </div>
      <ModalProduct product={product} isOpen={isOpen} mode={mode} onClose={onClose} />
    </>
  )
}

export default ProductCartItem
