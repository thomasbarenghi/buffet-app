'use client'
import { type FunctionComponent, useEffect, useState } from 'react'
import { useCartStore } from '@/context/zustand/cart.store'
import { type ShippingFormProps, type Product } from '@/interfaces'
import { getAllItems } from '@/services/cart/get-items.service'
import { Button, ProductsTable, Textarea } from '@/components'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import axios from 'axios'
import { createOrder } from '@/services/orders/create-order.service'

interface Props {
  userId: string
}

const Content: FunctionComponent<Props> = ({ userId }) => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const items = useCartStore((state) => state.items)
  const {
    formState: { errors, isSubmitting },
    handleSubmit
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
      const orderId = await createOrder(products)
      const { data: preference } = await axios.post('/api/checkout', {
        products,
        orderId
      })
      router.push(preference?.url as string)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {items?.length <= 0 && (
        <section className='flex min-h-[400px] w-full flex-col items-center justify-center 2xl:container'>
          <div className='flex flex-col items-center justify-center gap-3'>
            <div>
              <h1 className='text-center text-2xl font-semibold'>No hay productos en tu carrito</h1>
              <p className='text-center'>¿Que esperas para agregar productos a tu carrito?</p>
            </div>
            <Button
              title='Ir a comprar'
              onClick={() => {
                router.push(routes.customer.ALL_PRODUCTS)
              }}
            />
          </div>
        </section>
      )}
      {items?.length > 0 && (
        <>
          <section className='flex w-full flex-col justify-between gap-5 2xl:container'>
            <h1 className='text-2xl font-semibold'>Ya casi es tuyo</h1>
            <ProductsTable products={products} />
            <form className='flex flex-col  gap-3' onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                name='instructions'
                label='Instrucciones adicionales'
                placeholder='¿No queres que tenga sal o algo así? decíselo al cocinero'
                errorMessage={errors.instructions?.message}
              />
              <div className='flex w-full justify-start'>
                <Button type='submit' title='Finalizar compra' isLoading={isSubmitting} />
              </div>
            </form>
          </section>
        </>
      )}
    </>
  )
}

export default Content
