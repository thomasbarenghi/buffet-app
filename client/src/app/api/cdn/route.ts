/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/indent */
import { headers } from 'next/headers'
import { type NextRequest } from 'next/server'
import sharp from 'sharp'
import * as streamifier from 'streamifier'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import { apiCdnAuthorization } from '@/utils/constants'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const POST = async (req: NextRequest) => {
  try {
    const reqData = await req.formData()
    const headersList = headers()
    const authorization = headersList.get('api-cdn-authorization')

    if (authorization !== apiCdnAuthorization) {
      return new Response(
        JSON.stringify({
          message: 'No key provided'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    const file = reqData.get('image') as File

    if (!file) {
      return new Response(
        JSON.stringify({
          message: 'Imagen no proporcionada'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    const buffer = await file.arrayBuffer()
    const resizedImage = await sharp(buffer).resize(400, 400).toBuffer()

    const res = (await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error || !result) {
          reject(error)
          return
        }
        resolve(result)
      })
      streamifier.createReadStream(resizedImage).pipe(uploadStream)
    })) as UploadApiResponse

    return new Response(JSON.stringify({ url: res.secure_url }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        error
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
