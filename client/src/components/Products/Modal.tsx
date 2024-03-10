'use client'
import React, { type FunctionComponent } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { type Product } from '@/interfaces'
import Image from 'next/image'
import { Button } from '..'
import { useCartStore } from '@/context/zustand/cart.store'
// import { useSession } from 'next-auth/react'

interface Props {
  product: Product
  onClose: () => void
  isOpen: boolean
}

const ModalProduct: FunctionComponent<Props> = ({ product, onClose, isOpen }) => {
  // const { data: session, status } = useSession()
  const addItem = useCartStore((state) => state.addItem)
  return (
    <Modal size='5xl' isOpen={isOpen} onClose={onClose} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1' />
            <ModalBody>
              <div className='flex flex-col gap-5 md:flex-row'>
                <div className='relative aspect-video h-full  w-full md:aspect-square md:max-h-none'>
                  <Image src={product.thumbnail} alt={product.title} fill className='rounded-2xl object-cover ' />
                </div>
                <div className='flex w-auto flex-col gap-4'>
                  <div className='flex w-auto flex-col items-start gap-6'>
                    <div className='flex flex-col gap-3'>
                      <div className='flex flex-col gap-1'>
                        <p className='text-2xl font-semibold '>{product.title}</p>
                        <p className='text-xl font-semibold text-primary'>${product.price}</p>
                      </div>
                      <p className='font-light'>{product.description}</p>
                    </div>
                    <Button
                      title='Agregar al carrito'
                      size='lg'
                      radius='lg'
                      onClick={() => {
                        addItem(product)
                      }}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalProduct
