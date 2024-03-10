import { getRequest } from '@/services/api.requests'
import { type Profile, type Response } from '@/interfaces'
import { Endpoints } from '@/utils/constants/endpoints.const'
import { supabaseAnonApiKey } from '@/utils/constants/env.const'

const arrayToObject = (array: Profile[]): Profile => {
  const object = {}

  array.forEach((item) => {
    Object.assign(object, item)
  })

  return object as Profile
}

export const getProfile = async (id: string): Promise<Response<Profile>> => {
  const response = await getRequest<Profile[]>({
    url: Endpoints.FIND_PROFILE(id, supabaseAnonApiKey),
    cache: 'no-store',
    tags: ['profile']
  })

  if (response?.error) {
    console.error(response?.error)
  }

  const formated = {
    ...response,
    data: arrayToObject(response.data ?? [])
  }

  return formated
}
