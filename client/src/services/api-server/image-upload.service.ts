import 'server-only'
import { type ImageUploadRequest, type Response } from '@/interfaces'
import { generateServiceError } from '@/utils/functions'
import sharp from 'sharp'
import * as streamifier from 'streamifier'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface ImageUploadResponse {
  url: string | null
}

export const imageUpload = async (req: ImageUploadRequest): Promise<Response<ImageUploadResponse>> => {
  const { image: file } = req
  if (!(file instanceof File)) return generateServiceError(400, 'Must provide an image')
  const buffer = await file.arrayBuffer()
  const resizedImage = await sharp(buffer).resize(400, 400).toBuffer()
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const { secure_url: url } = (await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (error || !result) {
        reject(error)
        return
      }
      resolve(result)
    })
    streamifier.createReadStream(resizedImage).pipe(uploadStream)
  })) as UploadApiResponse

  return { data: { url }, error: null }
}

// return await mutationRequest<Res>({
//   method: 'post',
//   path: '/api/cdn',
//   body: formData,
//   customUrl: clientUrl,
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     'api-cdn-authorization': apiCdnAuthorization
//   }
// })
