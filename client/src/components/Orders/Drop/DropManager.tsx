import { Button, Dropdown, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import { getNextOrderStatus, getPreviousOrderStatus } from '../local-utils'
import { useSWRConfig } from 'swr'
import { toast } from 'sonner'
import { changeOrderStatus } from '@/services/api-client'
import { endpoints } from '@/utils/constants/endpoints.const'
import { type OrderInterface, OrderStatusApiEnum, type Profile } from '@/interfaces'
import dynamic from 'next/dynamic'
const DropMenu = dynamic(async () => await import('./DropMenu'))
const ClientModal = dynamic(async () => await import('../ClientModal'))
const CompleteModal = dynamic(async () => await import('../CompleteModal'))
const CancelModal = dynamic(async () => await import('../CancelModal'))

interface Props {
  order: OrderInterface
  client: Profile | null
}

export interface DropItems {
  title: string
  action: () => void
  isVisible: boolean
}

const DropManager = ({ order, client }: Props) => {
  const { mutate } = useSWRConfig()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    isOpen: isOpenComplete,
    onOpen: onOpenComplete,
    onOpenChange: onOpenChangeComplete,
    onClose: onCloseComplete
  } = useDisclosure()
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onOpenChange: onOpenChangeCancel,
    onClose: onCloseCancel
  } = useDisclosure()
  const handleViewClient = () => {
    onOpen()
  }

  const handleNextStep = async () => {
    try {
      const next = getNextOrderStatus(order.status as OrderStatusApiEnum)
      if (next === OrderStatusApiEnum.Delivered) return toast.warning('No disponible')
      await changeOrderStatus(next ?? OrderStatusApiEnum.Canceled, order.id)
      await mutate(endpoints.shops.ACTIVE_ORDERS)
      toast.success('Realizado')
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  const handlePrevStep = async () => {
    try {
      console.log('hola')
      const prev = getPreviousOrderStatus(order.status as OrderStatusApiEnum)
      if (prev === order.status) return toast.warning('No disponible')
      await changeOrderStatus(prev ?? OrderStatusApiEnum.Canceled, order.id)
      await mutate(endpoints.shops.ACTIVE_ORDERS)
      toast.success('Realizado')
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  const handleFinish = async (givenCode: string) => {
    try {
      if (givenCode !== order.code.toString()) {
        return toast.error('Codigo incorrecto')
      }
      await changeOrderStatus(OrderStatusApiEnum.Delivered, order.id)
      await mutate(endpoints.shops.ACTIVE_ORDERS)
      onCloseComplete()
      toast.success('Finalizado')
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  const handleModalFinish = () => {
    if (order.status !== 'PendingDelivery') {
      return toast.warning('No puedes finalizar un pedido en curso')
    }
    onOpenComplete()
  }

  const handleCancel = () => {
    console.log('en desarrollo')
    onCloseCancel()
  }

  const dropItems: DropItems[] = [
    {
      title: 'Ver cliente',
      action: () => {
        handleViewClient()
      },
      isVisible: true
    },
    {
      title: 'Etapa siguiente',
      action: async () => await handleNextStep(),
      isVisible: order.status !== OrderStatusApiEnum.PendingDelivery
    },
    {
      title: 'Etapa anterior',
      action: async () => await handlePrevStep(),
      isVisible: order.status !== OrderStatusApiEnum.PendingApproval
    },
    {
      title: 'Finalizar',
      action: async () => {
        handleModalFinish()
      },
      isVisible: order.status === OrderStatusApiEnum.PendingDelivery
    },
    {
      title: 'Cancelar',
      isVisible: true,
      action: () => {
        onOpenCancel()
      }
    }
  ]

  return (
    <>
      <ClientModal onOpenChange={onOpenChange} isOpen={isOpen} client={client} order={order} />
      <CompleteModal
        onOpenChangeComplete={onOpenChangeComplete}
        isOpenComplete={isOpenComplete}
        client={client}
        order={order}
        handleFinish={handleFinish}
      />
      <CancelModal
        onOpenChangeCancel={onOpenChangeCancel}
        isOpenCancel={isOpenCancel}
        order={order}
        handleCancel={handleCancel}
      />
      <Dropdown
        classNames={{
          content: '!min-w-[150px] '
        }}
      >
        <DropdownTrigger>
          <Button variant='flat' size='sm' className='!text-xs font-semibold' color='primary' radius='md'>
            Gestionar
          </Button>
        </DropdownTrigger>
        <DropMenu dropItems={dropItems} />
      </Dropdown>
    </>
  )
}

export default DropManager
