import { OrdersTable } from '@/components'
import { RoleEnum } from '@/interfaces'
import { getShopOrders } from '@/services/orders/get-shop-orders'
import { getUserOrders } from '@/services/orders/get-user-orders'
import { getProfile } from '@/services/user/get-profile.service'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ordenes | Buffet UNAHUR'
}

const Products = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')
  const orders =
    profile.data?.role === RoleEnum.Customer
      ? await getUserOrders(supabase, 'finished')
      : await getShopOrders(supabase, 'finished')

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
