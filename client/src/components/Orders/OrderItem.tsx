/* eslint-disable @typescript-eslint/indent */
'use client'
import {
  OrderStatusClientEnum,
  PaymentStatusClientEnum,
  type OrderInterface,
  OrderStatusApiEnum,
  type Role,
  RoleEnum
} from '@/interfaces'
import Image from 'next/image'
import DropManager from './DropManager'

interface Props {
  order: OrderInterface
  mode: Role
}

const ProductOrderItem = ({ order, mode }: Props) => (
  <>
    <div className='flex flex-col items-start gap-2 rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex w-full flex-col gap-1'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex w-full flex-col gap-1'>
            <p className=' font-semibold '>
              Orden #{order?.id?.slice(0, 4)}{' '}
              <span className='text-[#FB5607] '>
                {order.status === 'Canceled' ? 'cancelada' : order.status === 'Delivered' ? 'entregada' : 'en curso'}
              </span>
            </p>
            {order.status === 'Canceled' ||
              (order.status === 'Delivered' && <p className='text-xs font-light'>Realizada el 25/02/2023</p>)}
            {mode === RoleEnum.Customer && <p className='text-xs font-light'>{OrderStatusClientEnum[order?.status]}</p>}
            <p className='text-xs font-light'>
              ${order.total_price} Final - {PaymentStatusClientEnum[order?.payment_status]}{' '}
            </p>
          </div>
          {mode !== RoleEnum.Customer && <DropManager client={order.customer ?? null} order={order} />}
        </div>
      </div>
      <div className='grid w-full'>
        {Array.isArray(order.products) &&
          order?.products.map((product, index) => (
            <div
              className={`flex w-full flex-row items-center gap-2 py-3 ${order.products.length - 1 !== index && 'border-b'}`}
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
      <div className='flex flex-row gap-[4px] '>
        {order.status !== OrderStatusApiEnum.Canceled &&
          order.status !== OrderStatusApiEnum.Delivered &&
          order.instructions &&
          mode !== RoleEnum.Customer && (
            <p className='text-xs font-light'>
              <span className='font-semibold'>Instrucciones:</span> {order.instructions}{' '}
            </p>
          )}
        {order.status !== OrderStatusApiEnum.Canceled &&
          order.status !== OrderStatusApiEnum.Delivered &&
          mode === 'customer' && (
            <p className='text-xs font-light'>
              <span className='font-semibold'>Codigo de entrega:</span> {order.code}
            </p>
          )}
      </div>
    </div>
  </>
)

export default ProductOrderItem
