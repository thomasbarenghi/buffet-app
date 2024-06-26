'use client'
import { Input, Button } from '@/components'
import { type RawUserMeta, type ProfileFormData } from '@/interfaces'
import { userValidations } from '@/utils/constants'

import { type SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  mode: 'create' | 'edit'
  handleSubmitForm: (data: ProfileFormData) => Promise<any>
  profile?: RawUserMeta
}

const ProfileDynamicForm = ({ mode, handleSubmitForm, profile }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<ProfileFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<ProfileFormData> = async (formData) => {
    await handleSubmitForm(formData)
  }

  return (
    <div className='flex w-full flex-col gap-2 2xl:container'>
      <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='Nombre'
          placeholder='Ingrese su nombre'
          name='first_name'
          hookForm={{
            register,
            validations: userValidations.firstName
          }}
          errorMessage={errors?.first_name?.message}
          defaultValue={mode === 'create' ? '' : profile?.first_name}
        />
        <Input
          type='text'
          label='Apellido'
          placeholder='Ingrese su apellido'
          name='last_name'
          hookForm={{
            register,
            validations: userValidations.lastName
          }}
          errorMessage={errors?.last_name?.message}
          defaultValue={mode === 'create' ? '' : profile?.last_name}
        />
        <Input
          type='number'
          label='DNI'
          placeholder='Ingrese su numero de dni'
          name='dni'
          hookForm={{
            register,
            validations: userValidations.dni
          }}
          errorMessage={errors?.dni?.message}
          defaultValue={mode === 'create' ? '' : profile?.dni?.toString()}
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          size='lg'
          color='primary'
          radius='lg'
          title={mode === 'create' ? 'Finalizar registro' : 'Editar perfil'}
        />
      </form>
    </div>
  )
}

export default ProfileDynamicForm
