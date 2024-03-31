import 'server-only'
import { type Response, type Profile, type ProfileFormData } from '@/interfaces'
import { arrayToObject } from '@/utils/functions/arrayToObject'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getUserProfile = async (id?: string | null): Promise<Response<Profile>> => {
  const cookieStore = cookies()
  console.log(id)

  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const currentId = (await supabase.auth.getUser()).data.user?.id
  console.log(currentId)

  if (!id && !currentId) {
    console.log('no hay datos')
  }

  console.log(id, currentId)
  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', id ?? currentId ?? '')

  const pr = arrayToObject<any>(data ?? [])
  console.log(pr)
  console.log(error)
  return { error, data: pr }
}

export const createUserProfile = async (formData: ProfileFormData, id: string): Promise<Response<Profile>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data } = await supabase
    .from('profiles')
    .insert({
      first_name: formData.first_name,
      last_name: formData.last_name,
      dni: formData.dni,
      id: id ?? ''
    })
    .select()

  return { error, data: arrayToObject<any>(data ?? []) }
}

export const patchUserProfile = async (formData: ProfileFormData, id: string): Promise<Response<Profile>> => {
  console.log(formData, id)
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data } = await supabase
    .from('profiles')
    .update({ ...formData })
    .eq('id', id)
    .select()

  return { error, data: arrayToObject<any>(data ?? []) }
}
