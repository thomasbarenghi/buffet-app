import { type FunctionComponent } from 'react'
import { type OrderInterface } from '@/interfaces'
import { ProductOrderItem, OrderItemGroupPlaceholder } from '..'

interface Props {
  orders: OrderInterface[]
}

const MyOrdersGrid: FunctionComponent<Props> = ({ orders }) => (
  <section className='flex w-full flex-grow flex-col gap-4 2xl:container'>
    <h1 className='text-[24px] font-semibold leading-tight'>Tus ordenes</h1>
    {Array.isArray(orders) && orders.length > 0 ? (
      orders?.map((order: OrderInterface, index) => <ProductOrderItem order={order} key={index} />)
    ) : (
      <OrderItemGroupPlaceholder />
    )}
  </section>
)

export default MyOrdersGrid
