'use client'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { toast } from 'sonner'
import { type SubmitHandler, useForm } from 'react-hook-form'
import Info from './Info'
import { Button, ProductCartGrid, Textarea } from '@/components'
import { createOrder } from '@/services/api-client'
import { useCartStore } from '@/context/zustand/cart.store'
import { endpoints } from '@/utils/constants'
import { type ShippingFormProps, type Product } from '@/interfaces'

const Summary = ({ productsP }: { productsP: Product[] | undefined }) => {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const cleanCart = useCartStore((state) => state.cleanCart)
  const { data: products } = useSWR<Product[]>(endpoints.products.FIND_ALL(items.join(',')), {
    refreshInterval: 30000,
    fallbackData: productsP
  })

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<ShippingFormProps>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<ShippingFormProps> = async (data) => {
    try {
      const { data: res, error } = await createOrder(products ?? [], data.instructions)

      if (error) {
        toast.error('Algo salió mal')
        return
      }

      cleanCart()
      router.refresh()
      router.push(res?.payment_link ?? '')
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  return (
    <>
      <section className='resp-pad-x flex w-full justify-center bg-neutral-50   py-9 pt-8  '>
        <div className='flex w-full grid-cols-2 flex-col gap-5 2xl:container lg:grid lg:gap-10'>
          <div className='flex w-full flex-col gap-4'>
            <h1 className='text-2xl font-light'>
              Ya casi <span className='font-semibold'>terminamos</span>
            </h1>
            <ProductCartGrid products={items.length > 0 ? products ?? [] : []} withBg />
          </div>
          <form className='flex w-full flex-col  gap-6' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex w-full flex-col gap-4'>
              <h1 className='text-2xl font-light'>
                Resumen <span className='font-semibold'>del pedido</span>
              </h1>
              <div className='flex flex-col gap-1 rounded-xl border bg-white px-3 py-4'>
                <p className='text-sm'>
                  Total: <span className='font-semibold'>${products?.reduce((sum, item) => sum + item.price, 0)}</span>
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
                radius='md'
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
      <Info />
    </>
  )
}

export default Summary
