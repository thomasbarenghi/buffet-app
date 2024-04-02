'use client'
import { Button } from '@/components'
import { routes } from '@/utils/constants'
import { useRouter } from 'next/navigation'

const CartEmpty = () => {
  const router = useRouter()
  return (
    <section className='resp-pad-x flex min-h-[400px] w-full flex-col items-center justify-center  pt-8 2xl:container'>
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
  )
}

export default CartEmpty
