import { Footer, Header } from '@/components'
import { getOrder } from '@/services/orders/get-order.service'
import { routes } from '@/utils/constants/routes.const'
import { redirect } from 'next/navigation'

const Failure = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const orderId = searchParams.orderId ?? ''
  const order = await getOrder(orderId)

  if (order.data?.status !== 'Canceled') {
    redirect(routes.customer.ACCOUNT)
  }

  return (
    <>
      <Header />
      <main className=' resp-pad-x flex  min-h-screen flex-col items-center gap-9 pb-[80px]  pt-4'>
        <div className='flex w-full flex-col gap-2'>
          <h1 className='text-[24px] font-medium leading-tight'>Pago fallido</h1>
          <p className='font-light'>Lo sentimos, tu orden fue cancelada.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Failure
