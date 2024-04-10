'use client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ProfileDynamicForm } from '@/components'
import { createUserProfile } from '@/services/api-client'
import { routes } from '@/utils/constants'
import { type ProfileFormData } from '@/interfaces'

const Form = () => {
  const router = useRouter()

  const handleSubmitForm = async (formData: ProfileFormData) => {
    try {
      const { error } = await createUserProfile({ formData })
      if (error) return toast.error('Algo salió mal')
      router.refresh()
      router.push(routes.customer.HOME)
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return <ProfileDynamicForm mode='create' handleSubmitForm={handleSubmitForm} />
}

export default Form
