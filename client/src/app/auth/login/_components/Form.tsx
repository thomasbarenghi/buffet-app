'use client'
import { Input, Button } from '@/components'
import { type LoginFormData } from '@/interfaces'
import { emailValidations, passwordValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { routes } from '@/utils/constants/routes.const'

const Form: FunctionComponent = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        if (error.message === 'Invalid login credentials') {
          return toast.error('Contraseña incorrecta')
        }
        return toast.error('Algo salió mal')
      }

      router.refresh()
      router.push(routes.common.ACCOUNT)
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return (
    <form className='flex w-full flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        label='Email'
        placeholder='Ingrese su email'
        name='email'
        hookForm={{
          register,
          validations: emailValidations
        }}
        errorMessage={errors?.email?.message}
      />
      <Input
        type='password'
        label='Contraseña'
        placeholder='Ingrese su contraseña'
        name='password'
        hookForm={{
          register,
          validations: passwordValidations
        }}
        errorMessage={errors?.password?.message}
      />
      <Button type='submit' isLoading={isSubmitting} size='lg' color='primary' radius='lg' title='Ingresar' />
    </form>
  )
}

export default Form
