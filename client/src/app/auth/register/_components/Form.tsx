'use client'
import { Input, Button } from '@/components'
import { type LoginFormData } from '@/interfaces'
import { userValidations, routes } from '@/utils/constants'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { clientUrl } from '@/utils/constants/env.const'
import GoogleButton from '../../_components/GoogleButton'

const Form = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const oauthSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: clientUrl + routes.auth.CALLBACK,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      })

      router.push(routes.common.ACCOUNT)
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit: SubmitHandler<LoginFormData> = async (formData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: clientUrl + routes.auth.CALLBACK
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
    <div className='flex w-full flex-col gap-2'>
      <form className='flex w-full flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='Email'
          placeholder='Ingrese su email'
          name='email'
          hookForm={{
            register,
            validations: userValidations.email
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
            validations: userValidations.password
          }}
          errorMessage={errors?.password?.message}
        />
        <Button type='submit' isLoading={isSubmitting} size='lg' color='primary' radius='lg' title='Registrarme' />
      </form>
      <GoogleButton fn={oauthSignIn} />
    </div>
  )
}

export default Form
