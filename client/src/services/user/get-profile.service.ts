'use server'
import { getRequest } from '@/services/api.requests'
import { type Profile, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { arrayToObject } from '@/utils/functions/arrayToObject'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getProfile = async (id?: string): Promise<Response<Profile>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()

  const { error, data } = await getRequest<Profile[]>({
    url: Endpoints.FIND_PROFILE(user.data.user?.id ?? '', supabaseAnonApiKey),
    cache: 'no-store',
    tags: ['profile']
  })

  if (error) console.error(error)

  return {
    error,
    data: arrayToObject<Profile>(data ?? [])
  }
}
