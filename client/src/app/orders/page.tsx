import { type Metadata } from 'next'
import { Footer, Header, OrdersTable } from '@/components'
import { getOrders } from '@/services/api-server'
import { findUserMetaData } from '@/utils/functions'
import { RoleEnum } from '@/interfaces'

export const metadata: Metadata = {
  title: 'Pedidos | Buffet UNAHUR'
}

const Products = async () => {
  const profile = await findUserMetaData()
  const mode = profile?.role === RoleEnum.Customer ? 'user' : 'shop'
  const orders = await getOrders({ mode, type: 'finished' })

  return (
    <>
      <Header />
      <main className='resp-pad-x flex flex-col items-center gap-4 bg-neutral-50 py-10'>
        <section className='flex w-full flex-col gap-6 2xl:container'>
          <h1 className='text-2xl font-medium leading-tight'>Pedidos finalizadas</h1>
          <OrdersTable orders={orders?.data ?? []} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Products
