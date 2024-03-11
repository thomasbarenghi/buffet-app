import { Footer, Header } from '@/components'
import Content from './_components/Content'

const ActiveOrders = async () => (
  <>
    <Header />
    <main className=' resp-pad-x flex  min-h-screen flex-col items-center gap-9 pb-[80px]  pt-4'>
      <div className='flex w-full flex-col gap-4'>
        <h1 className='text-[24px] font-medium leading-tight'>Pedidos activos</h1>
        <Content />
      </div>
    </main>
    <Footer />
  </>
)

export default ActiveOrders
