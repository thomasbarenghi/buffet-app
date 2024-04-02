import { getOrder } from '@/services/api-server'
import { routes } from '@/utils/constants'
import { redirect } from 'next/navigation'

const Failure = async ({ searchParams }: { searchParams: Record<string, string> }) => {
  const orderId = searchParams.orderId ?? ''
  const order = await getOrder(orderId)

  if (order.data?.status !== 'Canceled') {
    redirect(routes.common.ACCOUNT)
  }

  return (
    <main className='resp-pad-x flex flex-col items-center justify-center gap-9 pb-14 pt-8'>
      <div className='flex w-full flex-col gap-2 2xl:container '>
        <h1 className='text-2xl font-medium leading-tight'>Pago fallido</h1>
        <p className='font-light'>Lo sentimos, tu orden fue cancelada.</p>
      </div>
    </main>
  )
}

export default Failure
