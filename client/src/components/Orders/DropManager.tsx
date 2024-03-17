import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { getNextOrderStatus, getPreviousOrderStatus } from './local-utils'
import { useSWRConfig } from 'swr'
import { toast } from 'sonner'
import { changeStatus } from '@/services/orders/change-status.service'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { type OrderInterface, OrderStatusApiEnum, type Profile } from '@/interfaces'

interface Props {
  order: OrderInterface
  client: Profile | null
}

const DropManager = ({ order, client }: Props) => {
  const { mutate } = useSWRConfig()
  const handleViewClient = () => {
    toast.info(`El cliente se llama ${client?.first_name} ${client?.last_name}, DNI ${client?.dni}.`)
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

  const handleFinish = async () => {
    try {
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
    } catch (error) {
      console.error(error)
      toast.error('Algo salió mal')
    }
  }

  return (
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
        <DropdownItem key='delete' className='text-danger' variant='flat' color='danger'>
          Cancelar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropManager
