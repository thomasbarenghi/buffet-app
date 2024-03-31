import { OrdersTable } from '@/components'
import { RoleEnum } from '@/interfaces'
import { getShopOrders, getUserOrders, getUserProfile } from '@/services/api-server'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ordenes | Buffet UNAHUR'
}

const Products = async () => {
  const profile = await getUserProfile()
  const orders =
    profile.data?.role === RoleEnum.Customer ? await getUserOrders('finished') : await getShopOrders('finished')

  return (
    <main className='resp-pad-x flex flex-col items-center gap-4 bg-neutral-50 pb-9 pt-8'>
      <section className='flex w-full flex-col gap-4 2xl:container'>
        <h1 className='text-2xl font-medium leading-tight'>Ordenes realizadas</h1>
        <OrdersTable orders={orders?.data ?? []} />
      </section>
    </main>
  )
}

export default Products
