import { type Metadata } from 'next'
import Content from './_components/Content'
import { getUserOrders } from '@/services/api-server'

export const metadata: Metadata = {
  title: 'Ordenes activas | Buffet UNAHUR'
}

// TODO: ORDENAR SEGUN ULTIMA ORDEN

const ActiveOrders = async () => {
  const orders = await getUserOrders('active')
  return (
    <main className='resp-pad-x flex flex-col items-center gap-9 bg-neutral-50 pb-14 pt-8'>
      <section className='flex w-full flex-col gap-4 2xl:container'>
        <h1 className='text-2xl font-medium leading-tight'>Pedidos activos</h1>
        <Content ordersFallback={orders.data ?? []} />
      </section>
    </main>
  )
}

export default ActiveOrders
