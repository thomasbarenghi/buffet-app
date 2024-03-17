import { type Profile, type Response, type ProfileFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createProfile = async (formData: ProfileFormData, id: string): Promise<Response<Profile>> => {
  const supabase = createClientComponentClient<Database>()
  const { error } = await supabase
    .from('profiles')
    .insert({
      first_name: formData.first_name,
      last_name: formData.last_name,
      dni: formData.dni,
      id: id ?? ''
    })
    .select()

  return { data: null, error }
}
