import { Footer, Header } from '@/components'
import Content from './_components/Content'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// TODO: ORDENAR SEGUN ULTIMA ORDEN

const ActiveOrders = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  return (
    <>
      <Header />
      <main className='resp-pad-x flex h-[500vh] flex-col items-center gap-9 bg-neutral-50 pb-14 pt-8'>
        <div className='flex w-full flex-col gap-4'>
          <h1 className='text-2xl font-medium leading-tight'>Pedidos activos</h1>
          <Content userId={user.data.user?.id ?? ''} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ActiveOrders
