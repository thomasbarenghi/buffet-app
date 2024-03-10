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
                  <Image
                    src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt={product.title}
                    fill
                    className='rounded-2xl object-cover '
                  />
                </div>
                <div className='flex w-auto flex-col gap-4'>
                  <div className='flex w-auto flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <div>
                        <p className='text-2xl font-semibold '>{product.title}</p>
                      </div>
                      <p className='text-xl font-semibold text-primary '>${product.price}</p>
                    </div>
                    <p className='text-base'>{product.description}</p>
                    <div>
                      {/* {(session?.user?.type === 'customer' || status === 'unauthenticated') && ( */}
                      {
                        <Button
                          title='Agregar al carrito'
                          variant='solid'
                          color='primary'
                          onClick={() => {
                            addItem(product)
                          }}
                        />
                      }
                    </div>
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
