import { type FunctionComponent } from 'react'
import { type OrderInterface } from '@/interfaces'
import { OrderItemGroupPlaceholder, ProductOrderItem } from '..'

interface Props {
  orders: OrderInterface[]
  withTitle?: boolean
  mode: 'customer' | 'shop'
}

const OrdersGrid: FunctionComponent<Props> = ({ orders, mode }) => (
  <div className='flex w-full flex-grow flex-col gap-4 2xl:container'>
    {Array.isArray(orders) && orders.length > 0 ? (
      orders?.map((order: OrderInterface, index) => <ProductOrderItem order={order} mode={mode} key={index} />)
    ) : (
      <OrderItemGroupPlaceholder
        title={
          <h1 className='text-[18px] font-light '>
            Parece que aun <span className='font-semibold'>no hay nada por aquí</span>
          </h1>
        }
      />
    )}
  </div>
)

export default OrdersGrid
