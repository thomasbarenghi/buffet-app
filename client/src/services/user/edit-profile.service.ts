import { type Profile, type Response, type ProfileFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const editProfile = async (data: ProfileFormData, id: string): Promise<Response<Profile>> => {
  const supabase = createClientComponentClient<Database>()
  const { error } = await supabase
    .from('profiles')
    .update({ ...data })
    .eq('id', id)
    .select()

  return { data: null, error }
}
