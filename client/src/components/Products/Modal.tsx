'use client'
import Image from 'next/image'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { Button } from '@/components'
import { useCartStore } from '@/context/zustand/cart.store'
import { type Role, RoleEnum, type Product } from '@/interfaces'

interface Props {
  product: Product | undefined
  onClose: () => void
  isOpen: boolean
  mode: Role
}

const ModalProduct = ({ product, onClose, isOpen, mode }: Props) => {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <Modal
      size={window.innerWidth > 768 ? 'xl' : '5xl'}
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: ` ${window.innerHeight > 800 ? 'flex-grow-0' : 'flex-grow'} lg:!my-4`,
        wrapper: 'flex flex-col'
      }}
      placement='center'
    >
      <ModalContent>
        <ModalHeader className=' border border-b pb-6' />
        <ModalBody className='overflow-y-auto py-6'>
          <div className='flex flex-col gap-5'>
            <div className='relative aspect-square h-full w-full md:aspect-video  md:max-h-none '>
              <Image
                src={product?.thumbnail ?? '/images/placeholder.png'}
                alt={product?.title ?? 'image'}
                fill
                className='rounded-xl object-cover '
              />
            </div>
            <div className='flex w-auto flex-col gap-4'>
              <div className='flex w-auto flex-col items-start gap-6'>
                <div className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-2xl font-semibold '>{product?.title}</p>
                    <p className='text-xl font-semibold text-primary'>${product?.price}</p>
                  </div>
                  <p className='font-light'>{product?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        {mode === RoleEnum.Customer && (
          <ModalFooter className=' border border-t '>
            <Button
              title='Agregar al carrito'
              size='lg'
              radius='lg'
              onClick={() => {
                if (!product) return
                addItem(product?.id)
              }}
            />
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalProduct
