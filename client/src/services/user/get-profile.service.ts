import { getRequest } from '@/services/api.requests'
import { type Profile, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'
import { arrayToObject } from '@/utils/functions/arrayToObject'

export const getProfile = async (id: string): Promise<Response<Profile>> => {
  const { error, data } = await getRequest<Profile[]>({
    url: Endpoints.FIND_PROFILE(id, supabaseAnonApiKey),
    cache: 'no-store',
    tags: ['profile']
  })

  if (error) console.error(error)

  return {
    error,
    data: arrayToObject<Profile>(data ?? [])
  }
}
