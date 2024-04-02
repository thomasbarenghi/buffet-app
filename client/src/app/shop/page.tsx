import { type Metadata } from 'next'
import { ProductCardGrid } from '@/components'

export const metadata: Metadata = {
  title: 'Tienda | Buffet UNAHUR'
}

const ShopPage = async () => (
  <main className='resp-pad-x  flex flex-col items-center gap-9 pb-14 pt-8'>
    <section className='flex w-full flex-col gap-2 2xl:container'>
      <h1 className='text-3xl font-light leading-tight'>
        Simplificamos tu manera de <span className='font-semibold'>comer en la uni.</span>
      </h1>
      <p className='font-light text-zinc-700'>
        Con Buffet, <span className='font-semibold text-black'>¡decile chau a la fila! </span> Disfruta de la comodidad
        de pagar tu pedido online desde tu celular. Creado por alumnos de la UNAHUR.
      </p>
    </section>
    <section className='flex w-full flex-col gap-6 2xl:container'>
      <div className='max-w-max'>
        <h1 className='text-2xl font-medium leading-tight'>Todo nuestro menú</h1>
        <hr className=' w-[40%] border-[#FFBE0B] ' />
      </div>
      <ProductCardGrid />
    </section>
  </main>
)

export default ShopPage
