import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import { getNextOrderStatus, getPreviousOrderStatus } from './local-utils'
import { useSWRConfig } from 'swr'
import { toast } from 'sonner'
import { changeStatus } from '@/services/orders/change-status.service'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { type OrderInterface, OrderStatusApiEnum, type Profile } from '@/interfaces'
import ClientModal from './ClientModal'
import CompleteModal from './CompleteModal'
import CancelModal from './CancelModal'

interface Props {
  order: OrderInterface
  client: Profile | null
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
      await changeStatus(next ?? OrderStatusApiEnum.Canceled, order.id)
      await mutate(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey))
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
      await changeStatus(prev ?? OrderStatusApiEnum.Canceled, order.id)
      await mutate(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey))
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
      await changeStatus(OrderStatusApiEnum.Delivered, order.id)
      await mutate(Endpoints.FIND_SHOP_ACTIVE_ORDERS(supabaseAnonApiKey))
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

  const dropItems = [
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
        <DropdownMenu aria-label='Action event example'>
          {dropItems
            .filter((item) => item.isVisible)
            .map((item, index) => (
              <DropdownItem key={index} onClick={item.action}>
                {item.title}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

export default DropManager
