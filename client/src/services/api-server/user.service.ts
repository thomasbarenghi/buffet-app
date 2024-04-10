/* eslint-disable @typescript-eslint/indent */
import 'server-only'
import {
  type Response,
  type Profile,
  RoleEnum,
  type CashAuthorizations,
  type AuthorizeBody,
  type CreateProfileRequest,
  type PatchUserProfile,
  type GetProfileRequest
} from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateServiceError } from '@/utils/functions'

export const findCashAuthorization = async (): Promise<Response<CashAuthorizations>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const currentId = (await supabase.auth.getUser()).data.user?.id ?? ''
    if (!currentId) return generateServiceError(400, 'Cant access current user')
    const { data, error } = await supabase.from('cash_authorizations').select().eq('id', currentId).single()
    return { data, error }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const authorizeCash = async (body: AuthorizeBody): Promise<Response<CashAuthorizations>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const currentId = (await supabase.auth.getUser()).data.user?.id
    if (!currentId) return generateServiceError(400, 'Cant access current user')

    const { data, error } = await supabase
      .from('cash_authorizations')
      .update({
        authorized_by: currentId,
        is_authorized: body.is_authorized
      })
      .eq('id', body.userId)
      .select()
      .single()

    return { data: data as CashAuthorizations, error }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const getAllCustomers = async (): Promise<Response<Profile[]>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(
        `
    *,
    cash_authorizations: cash_authorizations!public_cash_authorizations_id_fkey  ( is_authorized, authorized_by: profiles!public_cash_authorizations_authorized_by_fkey ( * ) )
    `
      )
      .eq('role', 'customer')

    return { error, data: data as Profile[] }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const getUserProfile = async (req: GetProfileRequest): Promise<Response<Profile>> => {
  const { id } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const currentId = (await supabase.auth.getUser()).data.user?.id
    if (!id && !currentId) return generateServiceError(400, 'Cant access current user')

    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', id ?? currentId ?? '')
      .single()

    return { error, data: data as Profile }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const createUserProfile = async (req: CreateProfileRequest): Promise<Response<Profile>> => {
  const { formData } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const id = (await supabase.auth.getUser()).data.user?.id
    if (!id) return generateServiceError(400, 'Cant access current user id')

    const { error: errorInsert, data: dataInsert } = await supabase
      .from('profiles')
      .insert({
        first_name: formData.first_name,
        last_name: formData.last_name,
        dni: formData.dni,
        id
      })
      .select()
      .single()

    if (errorInsert) return generateServiceError(400, errorInsert.details)

    const { error: insertCashAuthorizationError } = await supabase
      .from('cash_authorizations')
      .insert({
        id,
        authorized_by: null,
        is_authorized: false
      })
      .select()
      .single()

    if (insertCashAuthorizationError) return generateServiceError(400, insertCashAuthorizationError.details)

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        role: RoleEnum.Customer,
        full_name: dataInsert?.first_name + ' ' + dataInsert?.last_name,
        first_name: dataInsert?.first_name,
        last_name: dataInsert?.last_name,
        dni: dataInsert?.dni,
        profile_image: dataInsert?.profile_image
      }
    })

    if (updateError) return generateServiceError(400, updateError.message)

    await supabase.auth.refreshSession()
    await supabase.auth.getUser()
    // await supabase.auth.getSession()

    return { error: errorInsert, data: dataInsert as Profile }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const patchUserProfile = async (req: PatchUserProfile): Promise<Response<Profile>> => {
  const { formData, id } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error: errorUpdateProfile, data: dataUpdateProfile } = await supabase
      .from('profiles')
      .update({ ...formData })
      .eq('id', id)
      .select()
      .single()

    if (errorUpdateProfile) return generateServiceError(400, errorUpdateProfile.details)

    await supabase.auth.updateUser({
      data: {
        ...(dataUpdateProfile?.first_name &&
          dataUpdateProfile.last_name && {
            full_name: dataUpdateProfile.first_name + ' ' + dataUpdateProfile.last_name
          }),
        ...(dataUpdateProfile?.first_name && { first_name: dataUpdateProfile.first_name }),
        ...(dataUpdateProfile?.last_name && { last_name: dataUpdateProfile.last_name }),
        ...(dataUpdateProfile?.dni && { dni: dataUpdateProfile.dni }),
        ...(dataUpdateProfile?.profile_image && { profile_image: dataUpdateProfile.profile_image })
      }
    })

    await supabase.auth.refreshSession()
    await supabase.auth.getUser()
    // await supabase.auth.getSession()

    return { error: errorUpdateProfile, data: dataUpdateProfile as Profile }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}
