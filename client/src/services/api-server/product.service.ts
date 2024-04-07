import 'server-only'
import { type ProductFormData, type Response, type Product } from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const getAllProducts = async (ids?: string[] | null): Promise<Response<Product[]>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  let query = supabase.from('products').select()
  if (ids && Array.isArray(ids) && ids.length > 0) query = query.in('id', ids)
  const { data, error } = await query
  return { error, data }
}

export const getProduct = async (id: string): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { data, error } = await supabase.from('products').select().eq('id', id).single()

  return { error, data }
}

export const createProduct = async (product: ProductFormData): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })

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

  return { error, data }
}

export const patchProduct = async (product: ProductFormData, id: string): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
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

  return { error, data }
}

export const deleteProduct = async (id: string): Promise<Response<Product>> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const { error, data } = await supabase.from('products').delete().eq('id', id).select().single()
  return { error, data }
}
