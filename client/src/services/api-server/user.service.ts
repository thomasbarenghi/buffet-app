import 'server-only'
import { type Response, type Profile, type ProfileFormData, RoleEnum } from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getUserProfile = async (id?: string | null): Promise<Response<Profile>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const currentId = (await supabase.auth.getUser()).data.user?.id

  if (!id && !currentId) {
    console.log('No hay datos')
  }

  const { data, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', id ?? currentId ?? '')
    .single()

  const res = data as Profile
  return { error, data: res }
}

export const createUserProfile = async (formData: ProfileFormData): Promise<Response<Profile>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const id = (await supabase.auth.getUser()).data.user?.id
  const { error, data: res } = await supabase
    .from('profiles')
    .insert({
      first_name: formData.first_name,
      last_name: formData.last_name,
      dni: formData.dni,
      id: id ?? ''
    })
    .select()
    .single()

  await supabase.auth.updateUser({
    data: {
      role: RoleEnum.Customer,
      full_name: res?.first_name + ' ' + res?.last_name,
      first_name: res?.first_name,
      last_name: res?.last_name,
      dni: res?.dni,
      profile_image: res?.profile_image
    }
  })

  await supabase.auth.refreshSession()
  await supabase.auth.getUser()
  await supabase.auth.getSession()

  const res2 = res as Profile
  return { error, data: res2 }
}

export const patchUserProfile = async (formData: ProfileFormData, id: string): Promise<Response<Profile>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data: res } = await supabase
    .from('profiles')
    .update({ ...formData })
    .eq('id', id)
    .select()
    .single()

  await supabase.auth.updateUser({
    data: {
      ...(res?.first_name && res.last_name && { full_name: res.first_name + ' ' + res.last_name }),
      ...(res?.first_name && { first_name: res.first_name }),
      ...(res?.last_name && { last_name: res.last_name }),
      ...(res?.dni && { dni: res.dni }),
      ...(res?.profile_image && { profile_image: res.profile_image })
    }
  })

  await supabase.auth.refreshSession()
  await supabase.auth.getUser()
  await supabase.auth.getSession()

  const res2 = res as Profile
  return { error, data: res2 }
}
