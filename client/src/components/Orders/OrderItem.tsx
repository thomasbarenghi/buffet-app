/* eslint-disable @typescript-eslint/indent */
'use client'
import {
  OrderStatusClientEnum,
  PaymentStatusClientEnum,
  type Profile,
  type OrderInterface,
  OrderStatusApiEnum
} from '@/interfaces'
import Image from 'next/image'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { toast } from 'sonner'
import { changeStatus } from '@/services/orders/change-status.service'
import { useSWRConfig } from 'swr'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

interface Props {
  order: OrderInterface
  mode: 'customer' | 'shop'
}

interface PropsDrop {
  order: OrderInterface
  client: Profile | null
}

export const getNextOrderStatus = (currentStatus: OrderStatusApiEnum): OrderStatusApiEnum | undefined => {
  switch (currentStatus) {
    case OrderStatusApiEnum.PendingApproval:
      return OrderStatusApiEnum.PendingPreparation
    case OrderStatusApiEnum.PendingPreparation:
      return OrderStatusApiEnum.InProgress
    case OrderStatusApiEnum.InProgress:
      return OrderStatusApiEnum.PendingDelivery
    case OrderStatusApiEnum.PendingDelivery:
      return OrderStatusApiEnum.Delivered
    default:
      return currentStatus
  }
}

export const getPreviousOrderStatus = (currentStatus: OrderStatusApiEnum): OrderStatusApiEnum | undefined => {
  switch (currentStatus) {
    case OrderStatusApiEnum.PendingPreparation:
      return OrderStatusApiEnum.PendingApproval
    case OrderStatusApiEnum.InProgress:
      return OrderStatusApiEnum.PendingPreparation
    case OrderStatusApiEnum.PendingDelivery:
      return OrderStatusApiEnum.InProgress
    case OrderStatusApiEnum.Delivered:
      return OrderStatusApiEnum.PendingDelivery
    default:
      return currentStatus // No valid previous status for PendingApproval or Canceled
  }
}

const DropManager = ({ order, client }: PropsDrop) => {
  const { mutate } = useSWRConfig()
  const handleViewClient = () => {
    toast.info(`El cliente se llama ${client?.first_name} ${client?.last_name}, DNI ${client?.dni}.`)
  }

  const handleNextStep = async () => {
    const next = getNextOrderStatus(order.status as OrderStatusApiEnum)
    if (next === order.status) return toast.warning('No disponible')
    await changeStatus(next ?? OrderStatusApiEnum.Canceled, order.id)
    await mutate(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey))
    toast.success('Realizado')
  }

  const handlePrevStep = async () => {
    const prev = getPreviousOrderStatus(order.status as OrderStatusApiEnum)
    if (prev === order.status) return toast.warning('No disponible')
    await changeStatus(prev ?? OrderStatusApiEnum.Canceled, order.id)
    await mutate(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey))
    toast.success('Realizado')
  }

  const handleFinish = async () => {
    if (order.status !== 'PendingDelivery') {
      return toast.warning('No puedes finalizar un pedido en curso')
    }

    const givenCode = prompt('Ingresa el codigo del cliente')

    if (givenCode !== order.code.toString()) {
      return toast.error('Codigo incorrecto')
    }

    await changeStatus(OrderStatusApiEnum.Delivered, order.id)
    await mutate(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey))
    toast.success('Finalizado')
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='flat' size='sm' className='!text-xs font-semibold' color='primary' radius='md'>
          Gestionar
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Action event example'>
        <DropdownItem key='cli' onClick={handleViewClient}>
          Ver cliente
        </DropdownItem>

        <DropdownItem key='finish' onClick={handleFinish}>
          Finalizar
        </DropdownItem>

        <DropdownItem key='next' onClick={handleNextStep}>
          Etapa siguiente
        </DropdownItem>

        <DropdownItem key='prev' onClick={handlePrevStep}>
          Etapa anterior
        </DropdownItem>

        <DropdownItem key='delete' className='text-danger' color='danger'>
          Cancelar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
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
            {mode !== 'shop' && <p className='text-xs font-light'>{OrderStatusClientEnum[order?.status]}</p>}
            <p className='text-xs font-light'>
              ${order.total_price} Final - {PaymentStatusClientEnum[order?.payment_status]}{' '}
            </p>
          </div>
          {mode === 'shop' && <DropManager client={order.customer ?? null} order={order} />}
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
          mode === 'shop' && (
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
