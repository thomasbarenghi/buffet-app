'use client'
import { Input, Button } from '@/components'
import { RoleEnum, type LoginFormData } from '@/interfaces'
import { emailValidations, passwordValidations } from '@/utils/constants/validations.const'
import { type FunctionComponent } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { routes } from '@/utils/constants/routes.const'
import { clientUrl } from '@/utils/constants/env.const'

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

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: clientUrl + '/auth/callback',
          data: {
            role: RoleEnum.Customer
          }
        }
      })

      if (error) {
        toast.error('Algo salió mal')
        return
      }

      router.push(routes.auth.LOGIN)
      toast.info('Te enviamos un email para que confirmes tu cuenta')
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
      <Button type='submit' isLoading={isSubmitting} size='lg' color='primary' radius='lg' title='Registrarme' />
    </form>
  )
}

export default Form
