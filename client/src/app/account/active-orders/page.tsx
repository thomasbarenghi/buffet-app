import { Footer, Header } from '@/components'
import Content from './_components/Content'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const ActiveOrders = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  return (
    <>
      <Header />
      <main className=' resp-pad-x flex  min-h-screen flex-col items-center gap-9 pb-[80px]  pt-4'>
        <div className='flex w-full flex-col gap-4'>
          <h1 className='text-[24px] font-medium leading-tight'>Pedidos activos</h1>
          <Content userId={user.data.user?.id ?? ''} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ActiveOrders
