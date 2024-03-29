'use client'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useCartStore } from '@/context/zustand/cart.store'
import { type ShippingFormProps, type Product } from '@/interfaces'
import { getAllItems } from '@/services/cart/get-items.service'
import { Button, ProductCartGrid, Textarea } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import axios from 'axios'
import { createOrder } from '@/services/orders/create-order.service'
import Tips from './Tips'
import { toast } from 'sonner'

const Content: FunctionComponent = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const items = useCartStore((state) => state.items)
  const cleanCart = useCartStore((state) => state.cleanCart)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<ShippingFormProps>({
    mode: 'onChange'
  })

  useEffect(() => {
    const handleUpdateCart = async (): Promise<void> => {
      const products = await getAllItems(items)
      setProducts(products)
    }
    void handleUpdateCart()
  }, [items])

  const onSubmit: SubmitHandler<ShippingFormProps> = async (data) => {
    try {
      console.log(data)
      const orderId = await createOrder(products, data.instructions)
      const { data: preference } = await axios.post('/api/checkout', {
        products,
        orderId
      })
      cleanCart()
      router.push(preference?.url as string)
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  return (
    <>
      {items?.length <= 0 ? (
        <section className='resp-pad-x flex min-h-[400px] w-full flex-col items-center justify-center pt-8 2xl:container'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-center text-2xl font-semibold'>No hay productos en tu carrito</h1>
              <p className='text-center font-light text-zinc-700'>¿Que esperas para agregar productos a tu carrito?</p>
            </div>
            <Button
              title='Ir a comprar'
              onClick={() => {
                router.push(routes.customer.HOME)
              }}
            />
          </div>
        </section>
      ) : (
        <>
          <section className='resp-pad-x flex w-full justify-center  bg-neutral-50 py-9 pt-8  '>
            <div className='flex w-full grid-cols-2 flex-col gap-5 2xl:container lg:grid lg:gap-10'>
              <div className='flex w-full flex-col gap-4'>
                <h1 className='text-2xl font-light'>
                  Ya casi <span className='font-semibold'>terminamos</span>
                </h1>
                <ProductCartGrid products={products} withBg />
              </div>
              <form className='flex w-full flex-col  gap-6' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex w-full flex-col gap-4'>
                  <h1 className='text-2xl font-semibold'>Resumen</h1>
                  <div className='flex flex-col gap-1 rounded-xl border bg-white px-3 py-4'>
                    <p className='text-sm'>
                      Total:{' '}
                      <span className='font-semibold'>${products.reduce((sum, item) => sum + item.price, 0)}</span>
                    </p>
                    <p className='text-sm'>
                      Vas a pagar con: <span className='font-semibold'>Mercado Pago</span>
                    </p>
                  </div>
                  <Textarea
                    name='instructions'
                    label='Instrucciones adicionales'
                    placeholder='¿No queres que tenga sal o algo así? decíselo al cocinero'
                    errorMessage={errors.instructions?.message}
                    hookForm={{
                      register
                    }}
                  />
                </div>
                <div className='flex w-full justify-end'>
                  <Button type='submit' title='Finalizar compra' isLoading={isSubmitting} />
                </div>
              </form>
            </div>
          </section>
          <section className='resp-pad-x flex w-full justify-center border-t bg-white pt-8 '>
            <div className='flex w-full flex-col items-start justify-start gap-8 2xl:container'>
              <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-light'>
                  Antes de <span className='font-semibold'>realizar tu compra</span>
                </h1>
                <p className='font-light text-zinc-700'>Tenes que tener en cuenta estos datos</p>
              </div>
              <Tips />
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default Content
