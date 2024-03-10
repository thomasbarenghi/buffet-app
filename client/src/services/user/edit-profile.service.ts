import { type ProfileFormData } from '@/interfaces'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

export const editProfile = async (data: ProfileFormData, id: string) => {
  const supabase = createClientComponentClient<Database>()
  const { error, data: res } = await supabase
    .from('profiles')
    .update({ ...data })
    .eq('id', id)
    .select()

  if (error || data === null) {
    toast.error('Algo salió mal')
    throw new Error()
  }

  return res
}
