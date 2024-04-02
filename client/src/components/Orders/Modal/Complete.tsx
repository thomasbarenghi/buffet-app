'use client'
import Image from 'next/image'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { Input, Button } from '@/components'
import { required } from '@/utils/constants'
import { type OrderInterface, type Profile } from '@/interfaces'

export const LockIcon = () => <Image src='/icons/lock.svg' alt='lock' width={20} height={20} />

interface Props {
  client: Profile | undefined
  isOpenComplete: boolean
  onOpenChangeComplete: () => void
  order: OrderInterface | undefined
  handleFinish: (givenCode: string) => Promise<string | number | undefined>
}

interface FormProps {
  code: string
}

const CompleteModal = ({ isOpenComplete, onOpenChangeComplete, client, order, handleFinish }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<FormProps>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    await handleFinish(data.code)
  }

  return (
    <Modal isOpen={isOpenComplete} onOpenChange={onOpenChangeComplete} placement='center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Finalizar orden #{order?.id?.slice(0, 4)}</ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  endContent={<LockIcon />}
                  label='Codigo de entrega'
                  name='code'
                  placeholder='Ingresa el codigo de entrega'
                  type='password'
                  hookForm={{
                    register,
                    validations: { required }
                  }}
                  errorMessage={errors?.code?.message?.toString()}
                />
              </ModalBody>
              <ModalFooter>
                <Button title='Cancelar' color='danger' variant='flat' onClick={onClose} />
                <Button title='Finalizar orden' type='submit' color='primary' isLoading={isSubmitting} />
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CompleteModal
