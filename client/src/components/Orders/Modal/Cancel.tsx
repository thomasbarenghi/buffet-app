import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { Button } from '@/components'
import { type OrderInterface } from '@/interfaces'

interface Props {
  isOpenCancel: boolean
  onOpenChangeCancel: () => void
  order: OrderInterface | undefined
  handleCancel: () => void
}

const CancelModal = ({ isOpenCancel, onOpenChangeCancel, order }: Props) => (
  <Modal isOpen={isOpenCancel} placement='center' onOpenChange={onOpenChangeCancel}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className='flex flex-col gap-1'>
            ¿Seguro que quieres cancelar la orden #{order?.id?.slice(0, 4)}?
          </ModalHeader>
          <ModalBody>
            <p className='font-light'>Si aun no comenzó la preparacion, se devolverá el dinero.</p>
          </ModalBody>
          <ModalFooter>
            <Button title='Cerrar' color='danger' variant='flat' onClick={onClose} />
            <Button title='Cancelar orden' type='submit' color='primary' onClick={onClose} />
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
)

export default CancelModal
