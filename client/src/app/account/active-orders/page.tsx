import Content from './_components/Content'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUserOrders } from '@/services/orders/get-user-orders'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ordenes activas | Buffet UNAHUR'
}
// TODO: ORDENAR SEGUN ULTIMA ORDEN

const ActiveOrders = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const orders = await getUserOrders(supabase, 'active')
  return (
    <main className='resp-pad-x flex flex-col items-center gap-9 bg-neutral-50 pb-14 pt-8'>
      <section className='flex w-full flex-col gap-4 2xl:container'>
        <h1 className='text-2xl font-medium leading-tight'>Pedidos activos</h1>
        <Content userId={user.data.user?.id ?? ''} ordersFallback={orders.data ?? []} />
      </section>
    </main>
  )
}

export default ActiveOrders
