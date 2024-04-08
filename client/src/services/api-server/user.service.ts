import 'server-only'
import {
  type Response,
  type Profile,
  type ProfileFormData,
  RoleEnum,
  type CashAuthorizations,
  type AuthorizeBody
} from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const findCashAuthorization = async (): Promise<Response<CashAuthorizations>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const currentId = (await supabase.auth.getUser()).data.user?.id ?? ''

  const { data, error } = await supabase.from('cash_authorizations').select().eq('id', currentId).single()

  return { data, error }
}

export const authorizeCash = async (body: AuthorizeBody): Promise<Response<CashAuthorizations>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const currentId = (await supabase.auth.getUser()).data.user?.id

  console.log(body, currentId)

  const { data, error } = await supabase
    .from('cash_authorizations')
    .update({
      authorized_by: currentId,
      is_authorized: body.is_authorized
    })
    .eq('id', body.userId)
    .select()
    .single()

  console.log(error)

  const res = data as CashAuthorizations

  return { data: res, error }
}

export const getAllCustomers = async (): Promise<Response<Profile[]>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const { data, error } = await supabase
    .from('profiles')
    .select(
      `
  *,
  cash_authorizations: cash_authorizations!public_cash_authorizations_id_fkey  ( is_authorized, authorized_by: profiles!public_cash_authorizations_authorized_by_fkey ( * ) )
  `
    )
    .eq('role', 'customer')

  const res = data as Profile[]
  return { error, data: res }
}

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

  if (!id) {
    return {
      data: null,
      error: {
        code: 401,
        message: 'No ID provided'
      }
    }
  }

  const { error, data: res } = await supabase
    .from('profiles')
    .insert({
      first_name: formData.first_name,
      last_name: formData.last_name,
      dni: formData.dni,
      id
    })
    .select()
    .single()

  await supabase
    .from('cash_authorizations')
    .insert({
      id,
      authorized_by: null,
      is_authorized: false
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
