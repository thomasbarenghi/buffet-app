import { type Metadata } from 'next'
import { Button, ProductCardGrid } from '@/components'

export const metadata: Metadata = {
  title: 'Tienda | Buffet UNAHUR'
}

const ShopPage = async () => (
  <main className='  flex flex-col items-center gap-9 pb-14'>
    <section className='flex w-full flex-col'>
      <div className='resp-pad-x flex w-full items-center justify-center border-b py-4'>
        <div className='flex w-full flex-nowrap gap-0 overflow-y-auto 2xl:container'>
          <Button title='Todo el menú' size='lg' radius='lg' variant='solid' className='mr-3 min-w-max px-4' />
          <Button title='Desayunos' size='lg' radius='lg' variant='light' color='default' className='min-w-max px-4' />
          <Button title='Bebidas' size='lg' radius='lg' variant='light' color='default' className='min-w-max px-4' />
          <Button
            title='Comidas elaboradas'
            size='lg'
            radius='lg'
            variant='light'
            color='default'
            className='min-w-max px-4'
          />
        </div>
      </div>
    </section>
    <section className='resp-pad-x flex w-full justify-center'>
      <div className='flex w-full flex-col gap-6 2xl:container'>
        <ProductCardGrid />
      </div>
      {/* <div className='max-w-max'>
        <h1 className='text-2xl font-medium leading-tight'>Todo nuestro menú</h1>
        <hr className=' w-[40%] border-[#FFBE0B] ' />
      </div> */}
    </section>
  </main>
)

export default ShopPage
