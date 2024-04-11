import 'server-only'
import {
  type Response,
  type Product,
  type GetProductsRequest,
  type GetProductRequest,
  type CreateProductRequest,
  type PatchProductRequest,
  type DeleteProductRequest,
  type Category
} from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateServiceError } from '@/utils/functions'

export const revalidate = 0

const getAllTemplate = `
*,
category: categories ( * )
`
export const getAllCategories = async (): Promise<Response<Category[]>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error, data } = await supabase.from('categories').select()

    return { error, data }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const getAllProducts = async (req: GetProductsRequest): Promise<Response<Product[]>> => {
  const { ids } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    let query = supabase.from('products').select(getAllTemplate)

    if (ids && Array.isArray(ids) && ids.length > 0) query = query.in('id', ids)
    const { data, error } = await query
    console.log(error, data)

    return { error, data: data as unknown as Product[] }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const getProduct = async (req: GetProductRequest): Promise<Response<Product>> => {
  const { id } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { data, error } = await supabase.from('products').select().eq('id', id).single()
    return { error, data: data as unknown as Product }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const createProduct = async (req: CreateProductRequest): Promise<Response<Product>> => {
  const { product } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error, data } = await supabase
      .from('products')
      .insert([
        {
          title: product.title,
          description: product.description,
          price: product.price,
          ...(typeof product.thumbnail === 'string' && { thumbnail: product.thumbnail })
        }
      ])
      .select()
      .single()

    return { error, data: data as unknown as Product }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const patchProduct = async (req: PatchProductRequest): Promise<Response<Product>> => {
  const { product, id } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error, data } = await supabase
      .from('products')
      .update({
        ...(product.title && { title: product.title }),
        ...(product.description && { description: product.description }),
        ...(product.price && { price: product.price }),
        ...(typeof product.thumbnail === 'string' && { thumbnail: product.thumbnail })
      })
      .eq('id', id)
      .select()
      .single()

    return { error, data: data as unknown as Product }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}

export const deleteProduct = async (req: DeleteProductRequest): Promise<Response<Product>> => {
  const { id } = req
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  try {
    const { error, data } = await supabase.from('products').delete().eq('id', id).select().single()
    return { error, data: data as unknown as Product }
  } catch (error) {
    console.error(error)
    return generateServiceError(500, 'Catch: Internal Server Error')
  }
}
