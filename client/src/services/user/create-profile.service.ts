import { type ProfileFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

export const createProfile = async (data: ProfileFormData, id: string) => {
  const supabase = createClientComponentClient<Database>()
  const { error, data: profile } = await supabase
    .from('profiles')
    .insert({
      first_name: data.first_name,
      last_name: data.last_name,
      dni: data.dni,
      id: id ?? ''
    })
    .select()

  if (error || data === null) {
    toast.error('Algo salió mal')
    throw new Error()
  }

  return profile
}
