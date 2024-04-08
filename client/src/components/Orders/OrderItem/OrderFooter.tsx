import { type OrderInterface } from '@/interfaces'

interface Props {
  order: OrderInterface | undefined
  isActive: boolean
  isCustomer: boolean
  hasInstructions: boolean
}

const OrderFooter = ({ order, hasInstructions, isActive, isCustomer }: Props) => (
  <div className='flex flex-row gap-[4px] '>
    {isActive && hasInstructions && !isCustomer && (
      <p className='mt-2 text-xs font-light'>
        <span className='font-semibold'>Instrucciones:</span> {order?.instructions}
      </p>
    )}
    {isActive && isCustomer && (
      <p className='mt-2 text-xs font-light'>
        <span className='font-semibold'>Codigo de entrega:</span> {order?.code}
      </p>
    )}
  </div>
)

export default OrderFooter
