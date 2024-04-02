import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { Button } from '@/components'
import { type OrderInterface, type Profile } from '@/interfaces'

interface Props {
  client: Profile | undefined
  isOpen: boolean
  onOpenChange: () => void
  order: OrderInterface | undefined
}

const ClientModal = ({ isOpen, onOpenChange, client, order }: Props) => (
  <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className='flex flex-col gap-1'>Detalle cliente - orden #{order?.id?.slice(0, 4)}</ModalHeader>
          <ModalBody>
            <p className='font-light'>
              El cliente se llama{' '}
              <span className='font-semibold'>
                {client?.first_name} {client?.last_name}
              </span>
              , DNI {client?.dni}.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button title='Cerrar' color='danger' variant='flat' onClick={onClose} />
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
)

export default ClientModal
