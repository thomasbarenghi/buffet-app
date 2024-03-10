'use client'
import { Input, Button } from '@/components'
import { type ProfileFormData } from '@/interfaces'
import { nameValidations, required } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { routes } from '@/utils/constants/routes.const'

const Form: FunctionComponent = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<ProfileFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<ProfileFormData> = async (formData) => {
    try {
      const user = await supabase.auth.getUser()
      const { error } = await supabase
        .from('profiles')
        .insert({
          first_name: formData.first_name,
          last_name: formData.last_name,
          dni: formData.dni,
          id: user.data.user?.id ?? ''
        })
        .select()

      if (error) {
        toast.error('Algo salió mal')
        return
      }

      router.push(routes.customer.HOME)
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return (
    <section className='flex w-full flex-col gap-2 2xl:container'>
      <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='Nombre'
          placeholder='Ingrese su nombre'
          name='first_name'
          hookForm={{
            register,
            validations: nameValidations
          }}
          errorMessage={errors?.first_name?.message}
        />
        <Input
          type='text'
          label='Apellido'
          placeholder='Ingrese su apellido'
          name='last_name'
          hookForm={{
            register,
            validations: nameValidations
          }}
          errorMessage={errors?.last_name?.message}
        />
        <Input
          type='text'
          label='DNI'
          placeholder='Ingrese su numero de dni'
          name='dni'
          hookForm={{
            register,
            validations: { required }
          }}
          errorMessage={errors?.dni?.message}
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          size='lg'
          color='primary'
          radius='lg'
          title='Finalizar registro'
        />
      </form>
    </section>
  )
}

export default Form
