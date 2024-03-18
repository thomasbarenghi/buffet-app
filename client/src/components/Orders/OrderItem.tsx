'use client'
import {
  PaymentStatusClientEnum,
  type OrderInterface,
  type Role,
  RoleEnum,
  OrderStatusClientEnum,
  type Profile,
  type Message
} from '@/interfaces'
import Image from 'next/image'
import DropManager from './DropManager'
import ChatBox from './ChatBox'
import useSWR from 'swr'
import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { toast } from 'sonner'

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
  profile: Profile
  mode: Role
}

const ProductOrderItem = ({ order, mode, profile }: Props) => {
  const supabase = createClientComponentClient<Database>()
  const isActive = order.status !== 'Canceled' && order.status !== 'Delivered' && order.status !== 'PendingPayment'
  const isFinished = order.status === 'Canceled' || order.status === 'Delivered'
  const isCustomer = mode === RoleEnum.Customer

  const renderOrderStatus = () => {
    const statusText =
      order.status === 'Canceled' ? 'cancelada' : order.status === 'Delivered' ? 'entregada' : 'en curso'
    return <span className='text-[#FB5607]'>{statusText}</span>
  }

  const { data: messages, mutate } = useSWR<Message[]>(
    Endpoints.FIND_ORDER_MESSAGES(order?.id ?? '', supabaseAnonApiKey),
    {
      refreshInterval: 30000
    }
  )

  useEffect(() => {
    supabase
      .channel('custom-insert-channel2')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `order_id=eq.${order.id ?? ''}` },
        (payload) => {
          if (payload.new.user_id !== profile?.id) {
            toast.info('Nuevo mensaje en #' + order.id.slice(0, 4))
          }
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          mutate()
        }
      )
      .subscribe()
  }, [mutate, order.id, profile, supabase])

  return (
    <div className='flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex w-full flex-col gap-1'>
        <div className='flex w-full items-start justify-between'>
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
          <div className='flex items-start gap-1'>
            {isActive && <ChatBox profile={profile} order={order} messages={messages!} />}
            {!isCustomer && isActive && <DropManager client={order.customer ?? null} order={order} />}
          </div>
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
