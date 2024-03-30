import { clientUrl } from '@/utils/constants/env.const'
import { mutationRequest } from '../api.requests'
import { type ProductFormData } from '@/interfaces'

interface Res {
  url: string
}

export const getProductImageLink = async (product: ProductFormData) => {
  const formData = new FormData()

  if (!(product.thumbnail instanceof FileList)) {
    throw new Error('Invalid thumbnail format. Expected a File object.')
  }

  console.log(product?.thumbnail[0])

  formData.append('image', product.thumbnail[0])
  console.log(clientUrl)

  return await mutationRequest<Res>(
    'post',
    '/api/cdn',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    clientUrl
  )
}
