'use client'
import { type ProfileFormData } from '@/interfaces'
import { type FunctionComponent } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { routes } from '@/utils/constants/routes.const'
import { createProfile } from '@/services/user/create-profile.service'
import { ProfileDynamicForm } from '@/components'

const Form: FunctionComponent = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const handleSubmitForm = async (formData: ProfileFormData) => {
    try {
      const user = await supabase.auth.getUser()
      const { profile } = await createProfile(formData, user.data.user?.id ?? '')
      console.log(profile)
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
