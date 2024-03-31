import 'server-only'
import { type ProductFormData, type Response, type Product } from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { arrayToObject } from '@/utils/functions/arrayToObject'
import { mutationRequest } from '../api.requests'
import { clientUrl } from '@/utils/constants/env.const'

export const getAllProducts = async (): Promise<Response<Product[]>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase.from('products').select()

  return { error, data }
}

export const getProduct = async (id: string): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase.from('products').select().eq('id', id)

  return { error, data: arrayToObject<Product>(data ?? []) }
}

export const createProduct = async (product: ProductFormData): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const image = await getProductImageLink(product)

  const { error, data } = await supabase
    .from('products')
    .insert([
      {
        title: product.title,
        description: product.description,
        price: product.price,
        ...(image?.data?.url && { thumbnail: image?.data?.url })
      }
    ])
    .select()

  return { error, data: arrayToObject<Product>(data ?? []) }
}

export const patchProduct = async (product: ProductFormData, id: string): Promise<Response<Product>> => {
  console.log(product, id)
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const image = await getProductImageLink(product)
  const { error, data } = await supabase
    .from('products')
    .update({
      ...(product.title && { title: product.title }),
      ...(product.description && { description: product.description }),
      ...(product.price && { price: product.price }),
      ...(image?.data?.url && { thumbnail: image?.data?.url })
    })
    .eq('id', id)
    .select()

  return { error, data: arrayToObject<Product>(data ?? []) }
}

export const deleteProduct = async (id: string): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data } = await supabase.from('products').delete().eq('id', id).select()
  return { error, data: arrayToObject<Product>(data ?? []) }
}

interface Res {
  url: string
}

export const getProductImageLink = async (product: ProductFormData) => {
  const formData = new FormData()

  if (!(product?.thumbnail instanceof Array)) {
    return null
  }

  formData.append('image', product.thumbnail[0])

  return await mutationRequest<Res>({
    method: 'post',
    path: '/api/cdn',
    body: formData,
    customUrl: clientUrl,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
