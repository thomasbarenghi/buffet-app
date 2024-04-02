'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input, Button } from '@/components'
import GoogleButton from '../../_components/GoogleButton'
import { clientUrl, routes, userValidations } from '@/utils/constants'
import { type LoginFormData } from '@/interfaces'

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
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) {
        if (error.message === 'Invalid login credentials') {
          return toast.error('Contraseña incorrecta')
        }
        return toast.error('Algo salió mal')
      }

      router.push(routes.common.ACCOUNT)
      router.refresh()
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
        <Button type='submit' isLoading={isSubmitting} size='lg' color='primary' radius='lg' title='Ingresar' />
      </form>
      <GoogleButton fn={oauthSignIn} />
    </div>
  )
}

export default Form
