import { type ProductFormData } from '@/interfaces'
import { deleteProduct, getProduct, patchProduct } from '@/services/api-server'
import { imageUpload } from '@/services/api-server/image-upload.service'
import { generateErrorResponse } from '@/utils/functions'
import { type PostgrestError } from '@supabase/supabase-js'

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { data, error } = await getProduct(params.id)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json({ data })
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  const formData = await req.formData()
  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  const body: { thumbnail: File; title: string; price: number; description: string } = {
    thumbnail: formData.get('thumbnail') as File,
    title: formData.get('title') as string,
    price: parseInt(formData.get('price') as string),
    description: formData.get('description') as string
  }

  const image = await imageUpload(body.thumbnail)

  const product: ProductFormData = {
    title: body.title,
    price: body.price,
    description: body.description,
    thumbnail: typeof image?.data?.url === 'string' ? image?.data?.url : undefined
  }

  const { data, error } = await patchProduct(product, params.id)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json({ data })
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  const { data, error } = await deleteProduct(params.id)
  if (error) return generateErrorResponse(error as PostgrestError)
  return Response.json({ data })
}
