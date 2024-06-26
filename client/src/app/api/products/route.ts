import { type NextRequest } from 'next/server'
import { createProduct, getAllProducts } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions'
import { type ProductFormData } from '@/interfaces'
import { imageUpload } from '@/services/api-server/image-upload.service'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('ids')
  const ids = query?.split(',') ?? null
  const { data, error } = await getAllProducts({ ids })
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}

export const POST = async (req: Request) => {
  const formData = await req.formData()
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  const body: { thumbnail: File; title: string; price: number; description: string } = {
    thumbnail: formData.get('product[thumbnail]') as File,
    title: formData.get('product[title]') as string,
    price: parseInt(formData.get('product[price]') as string),
    description: formData.get('product[description]') as string
  }

  const image = await imageUpload({ image: body.thumbnail })

  const product: ProductFormData = {
    title: body.title,
    price: body.price,
    description: body.description,
    thumbnail: typeof image?.data?.url === 'string' ? image?.data?.url : undefined
  }

  const { error, data } = await createProduct({ product })
  if (error) return generateErrorResponse({ status: error.code, error })
  return Response.json(data)
}
