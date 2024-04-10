'use client'
import dynamic from 'next/dynamic'
import {
  PaymentStatusClientEnum,
  type OrderInterface,
  type Role,
  RoleEnum,
  OrderStatusClientEnum,
  type Profile,
  OrderStatusApiEnum,
  PaymentMethodsClientEnum,
  type OrderStatusType
} from '@/interfaces'
import { Button, DropTrigger } from '@/components'
import ProductList from './ProductList'
import OrderFooter from './Footer'
const DropManager = dynamic(async () => await import('../Drop/DropManager'), {
  loading: () => <DropTrigger />
})

export const revalidate = 0

interface Props {
  order: OrderInterface | undefined
  profile: Profile
  mode: Role | string
}

const renderOrderStatus = (status: Partial<OrderStatusType>) => {
  const statusText =
    status === OrderStatusApiEnum.Canceled
      ? 'cancelada'
      : status === OrderStatusApiEnum.Delivered
        ? 'entregada'
        : status === OrderStatusApiEnum.PendingPayment
          ? 'pendiente de pago'
          : 'en curso'
  return <span className='text-[#FB5607]'>{statusText}</span>
}

const ProductOrderItem = ({ order, mode, profile }: Props) => {
  const isPendingPayment = order?.status === OrderStatusApiEnum.PendingPayment
  const isActive = order?.status !== OrderStatusApiEnum.Canceled && order?.status !== OrderStatusApiEnum.Delivered
  const isFinished = order?.status === OrderStatusApiEnum.Canceled || order?.status === OrderStatusApiEnum.Delivered
  const isCustomer = mode === RoleEnum.Customer
  const hasInstructions = Boolean(order?.instructions)
  const isPaidDigitally = order?.payment_method === 'MercadoPago'

  return (
    <div className='flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex w-full flex-col gap-1'>
        <div className='flex w-full items-start justify-between'>
          <div className='flex w-full flex-col gap-1'>
            <div className='flex items-center justify-between'>
              <p className=' font-semibold '>
                Orden #{order?.id?.slice(0, 4)}{' '}
                <span className='text-[#FB5607]'>{renderOrderStatus(order?.status ?? 'PendingPayment')}</span>
              </p>
              {isFinished && <p className='text-xs font-light'>${order.total_price} Final</p>}
            </div>
            {!isFinished && (
              <p className='text-xs font-light'>
                ${order?.total_price} Final
                {order?.payment_status !== 'Pending' &&
                  ' | ' + PaymentStatusClientEnum[order?.payment_status ?? 'Pending']}
                {' | ' + PaymentMethodsClientEnum[order?.payment_method ?? 'MercadoPago']}
              </p>
            )}
            {isActive && isCustomer && !isPendingPayment && (
              <p className='text-xs font-light'>{OrderStatusClientEnum[order?.status ?? 'PendingPayment']}</p>
            )}
            {isFinished && (
              <p className='text-xs font-light'>Realizada el {new Date(order.created_at).toLocaleString()}</p>
            )}
          </div>
          <div className='flex items-start gap-1'>
            {!isCustomer && isActive && <DropManager client={order?.customer} order={order} />}
            {isCustomer && isActive && isPendingPayment && isPaidDigitally && (
              <Button title='Pagar' size='sm' href={order?.payment_link} />
            )}
          </div>
        </div>
      </div>
      <ProductList order={order} />
      <OrderFooter isActive={isActive} isCustomer={isCustomer} order={order} hasInstructions={hasInstructions} />
    </div>
  )
}

export default ProductOrderItem

// const { mutate } = useSWR<Message[]>(endpoints.messages.FIND_ORDER_MESSAGES(order?.id ?? ''), {
//   refreshInterval: 30000
// })

// useEffect(() => {
//   supabase
//     .channel(order?.id ?? '')
//     .on(
//       'postgres_changes',
//       { event: 'INSERT', schema: 'public', table: 'messages', filter: `order_id=eq.${order?.id ?? ''}` },
//       (payload) => {
//         if (payload?.new?.user_id !== profile?.id) {
//           toast.info(
//             `Nuevo mensaje en #${order?.id?.slice(0, 4)} (${OrderStatusClientEnum[order?.status ?? 'PendingPayment']})`,
//             {
//               duration: 1800000,
//               description: payload?.new?.message
//             }
//           )
//         }
//         // eslint-disable-next-line @typescript-eslint/no-floating-promises
//         mutate()
//       }
//     )
//     .subscribe()
// }, [mutate, order?.id, order?.status, profile, supabase])
