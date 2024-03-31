import { deleteProduct, getProduct, patchProduct } from '@/services/api-server'
import { generateErrorResponse } from '@/utils/functions/generateErrorResponse'
import { type PostgrestError } from '@supabase/supabase-js'

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { data, error } = await getProduct(params.id)
    if (error) generateErrorResponse(error as PostgrestError)
    return Response.json({ data })
  } catch (error) {
    console.log(error)
    return new Response('Error', {
      status: 500
    })
  }
}

export const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const product = await req.json()
    console.log(product)

    const { data, error } = await patchProduct(product, params.id)
    if (error) generateErrorResponse(error as PostgrestError)
    return Response.json({ data })
  } catch (error) {
    console.log(error)
    return new Response('Error', {
      status: 500
    })
  }
}

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    const { data, error } = await deleteProduct(params.id)
    if (error) generateErrorResponse(error as PostgrestError)
    return Response.json({ data })
  } catch (error) {
    console.log(error)
    return new Response('Error', {
      status: 500
    })
  }
}
