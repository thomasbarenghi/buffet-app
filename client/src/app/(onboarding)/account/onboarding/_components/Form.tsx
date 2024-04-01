'use client'
import { type ProfileFormData } from '@/interfaces'
import { type FunctionComponent } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import { createUserProfile } from '@/services/api-client'
import { ProfileDynamicForm } from '@/components'

const Form: FunctionComponent = () => {
  const router = useRouter()

  const handleSubmitForm = async (formData: ProfileFormData) => {
    try {
      const { error } = await createUserProfile(formData)
      if (error) return toast.error('Algo salió mal')
      router.refresh()
      console.log('test xxx')
      router.push(routes.customer.HOME)
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return <ProfileDynamicForm mode='create' handleSubmitForm={handleSubmitForm} />
}

export default Form
