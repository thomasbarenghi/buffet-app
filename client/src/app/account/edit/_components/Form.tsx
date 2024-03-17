'use client'
import { type Profile, type ProfileFormData } from '@/interfaces'
import { type FunctionComponent } from 'react'
import { toast } from 'sonner'
import { ProfileDynamicForm } from '@/components'
import { type UserResponse } from '@supabase/supabase-js'
import { editProfile } from '@/services/user/edit-profile.service'
import { updateRedirect } from '../updatePath'

interface Props {
  user: UserResponse
  profile: Profile
}

const Form: FunctionComponent<Props> = ({ user, profile }) => {
  const handleSubmitForm = async (formData: ProfileFormData) => {
    try {
      const { error } = await editProfile(formData, user.data.user?.id ?? '')
      if (error) return toast.error('Algo salió mal')
      await updateRedirect()
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return <ProfileDynamicForm profile={profile} mode='edit' handleSubmitForm={handleSubmitForm} />
}

export default Form
