import 'server-only'
import { apiCdnAuthorization, clientUrl } from '@/utils/constants/env.const'
import { mutationRequest } from '../api.requests'
import { type Response } from '@/interfaces'

interface Res {
  url: string | null
}

export const imageUpload = async (imageArr: File | undefined): Promise<Response<Res>> => {
  const formData = new FormData()

  if (!(imageArr instanceof File)) {
    return {
      data: {
        url: null
      },
      error: {
        code: 400,
        message: 'Must provide an image'
      }
    }
  }

  formData.append('image', imageArr)

  return await mutationRequest<Res>({
    method: 'post',
    path: '/api/cdn',
    body: formData,
    customUrl: clientUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
      'api-cdn-authorization': apiCdnAuthorization
    }
  })
}
