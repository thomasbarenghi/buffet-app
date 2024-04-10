'use client'
import { toast } from 'sonner'
import { ProfileDynamicForm } from '@/components'
import { type RawUserMeta, type ProfileFormData } from '@/interfaces'
import { patchUserProfile } from '@/services/api-client'
// import { updateRedirect } from '../updatePath'

interface Props {
  profile: RawUserMeta
}

const Form = ({ profile }: Props) => {
  const handleSubmitForm = async (formData: ProfileFormData) => {
    try {
      const { error } = await patchUserProfile({ formData, id: profile.id ?? '' })
      if (error) return toast.error('Algo salió mal')
      // await updateRedirect()
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return <ProfileDynamicForm profile={profile} mode='edit' handleSubmitForm={handleSubmitForm} />
}

export default Form
