/* eslint-disable @typescript-eslint/member-delimiter-style */
'use client'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { toast } from 'sonner'
import { Radio, RadioGroup } from '@nextui-org/react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import Info from './Info'
import { Button, ProductCartGrid, Textarea } from '@/components'
import { createOrder } from '@/services/api-client'
import { useCartStore } from '@/context/zustand/cart.store'
import { endpoints, routes } from '@/utils/constants'
import { type OrderFormProps, type Product, type PaymentMethods, PaymentMethodsApiEnum } from '@/interfaces'
import { calculateFinalPrice, itemToIdArray } from '@/utils/functions'

interface Props {
  isCashAuthorized: boolean
  productsP: Product[] | undefined
}

const Summary = ({ productsP, isCashAuthorized }: Props) => {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const cleanCart = useCartStore((state) => state.cleanCart)
  const { data: products } = useSWR<Product[]>(endpoints.products.FIND_ALL(itemToIdArray(items).join(',')), {
    refreshInterval: 30000,
    fallbackData: productsP
  })

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    control,
    setValue
  } = useForm<OrderFormProps>({
    mode: 'onChange',
    defaultValues: {
      payment_method: 'MercadoPago'
    }
  })

  const onSubmit: SubmitHandler<OrderFormProps> = async (data) => {
    try {
      const { data: res, error } = await createOrder({
        details: data,
        products: items ?? []
      })

      if (error) {
        console.error(error)
        toast.error('Algo salió mal')
      }

      cleanCart()
      router.refresh()
      router.push(res?.payment_link ?? routes.common.ACCOUNT)
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  const paymentMethods: Array<{ value: PaymentMethods; label: string; isVisible: boolean }> = [
    {
      value: PaymentMethodsApiEnum.MercadoPago,
      label: 'Mercado Pago',
      isVisible: true
    },
    {
      value: PaymentMethodsApiEnum.Cash,
      label: 'Efectivo',
      isVisible: isCashAuthorized
    }
  ]

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
              <div className='flex flex-col gap-3 rounded-xl border bg-white px-3 py-4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-sm font-semibold'>Metodo de pago</p>
                  <Controller
                    control={control}
                    rules={{ required: { value: true, message: 'Este campo es requerido' } }}
                    name='payment_method'
                    defaultValue='MercadoPago'
                    render={({ field: { onBlur, value } }) => (
                      <RadioGroup
                        onValueChange={(selected) => {
                          setValue('payment_method', selected as PaymentMethods)
                        }}
                        onBlur={onBlur}
                        value={value}
                        color='primary'
                        size='sm'
                        errorMessage={errors.payment_method?.message}
                        defaultValue={PaymentMethodsApiEnum.MercadoPago}
                      >
                        {paymentMethods
                          .filter((item) => item.isVisible)
                          .map((item) => (
                            <Radio value={item.value} key={item.value}>
                              {item.label}{' '}
                            </Radio>
                          ))}
                      </RadioGroup>
                    )}
                  />
                </div>
                <p className='text-sm'>
                  Total: <span className='font-semibold'>${calculateFinalPrice(items)}</span>
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
