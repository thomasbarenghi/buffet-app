'use client'
import { PaymentStatusClientEnum, type OrderInterface, type Role, RoleEnum, OrderStatusClientEnum } from '@/interfaces'
import Image from 'next/image'
import DropManager from './DropManager'

const Products = ({ order }: { order: OrderInterface }) => (
  <div className='grid w-full'>
    {Array.isArray(order.products) &&
      order?.products.map((product, index) => (
        <div
          className={`flex w-full flex-row items-center gap-2 pt-3 ${order.products.length - 1 !== index && 'border-b pb-3'}`}
          key={product.id}
        >
          <div className='relative aspect-square h-auto w-full max-w-[50px]'>
            <Image src={product?.thumbnail} alt='picture' fill className='rounded-xl object-cover' />
          </div>
          <div className='flex w-full flex-col gap-[2px] '>
            <h1 className='text-sm font-normal'>{product?.title}</h1>
            <p className='text-xs font-semibold'>${product?.price}</p>
          </div>
        </div>
      ))}
  </div>
)

interface Props {
  order: OrderInterface
  mode: Role
}

const ProductOrderItem = ({ order, mode }: Props) => {
  const isActive = order.status !== 'Canceled' && order.status !== 'Delivered'
  const isFinished = order.status === 'Canceled' || order.status === 'Delivered'
  const isCustomer = mode === RoleEnum.Customer

  const renderOrderStatus = () => {
    const statusText =
      order.status === 'Canceled' ? 'cancelada' : order.status === 'Delivered' ? 'entregada' : 'en curso'
    return <span className='text-[#FB5607]'>{statusText}</span>
  }

  return (
    <div className='flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex w-full flex-col gap-1'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex w-full flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <p className=' font-semibold '>
                Orden #{order?.id?.slice(0, 4)} <span className='text-[#FB5607]'>{renderOrderStatus()}</span>
              </p>
              {isFinished && <p className='text-xs font-light'>${order.total_price} Final</p>}
            </div>
            {isActive && (
              <p className='text-xs font-light'>
                ${order.total_price} Final | {PaymentStatusClientEnum[order.payment_status]}
              </p>
            )}
            {isActive && isCustomer && <p className='text-xs font-light'>{OrderStatusClientEnum[order.status]}</p>}
            {isFinished && (
              <p className='text-xs font-light'>Realizada el {new Date(order.created_at).toLocaleString()}</p>
            )}
          </div>
          {!isCustomer && isActive && <DropManager client={order.customer ?? null} order={order} />}
        </div>
      </div>
      <Products order={order} />
      <div className='flex flex-row gap-[4px] '>
        {isActive && order.instructions && !isCustomer && (
          <p className='mt-2 text-xs font-light'>
            <span className='font-semibold'>Instrucciones:</span> {order.instructions}
          </p>
        )}
        {isActive && isCustomer && (
          <p className='mt-2 text-xs font-light'>
            <span className='font-semibold'>Codigo de entrega:</span> {order.code}
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductOrderItem
