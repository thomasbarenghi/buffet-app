/* eslint-disable @typescript-eslint/indent */
import { type SupabaseClient, type PostgrestError } from '@supabase/supabase-js'
import { type OrderInterface, type CartItem, type OrderStatusApiEnum } from './order.interface'
import { type ProductFormData, type OrderFormProps, type ProfileFormData } from './form.interface'

export interface Response<T> {
  data: T | null
  error: GeneralError
}

export type GeneralError =
  | {
      message: string
      code: number
    }
  | null
  | PostgrestError
  | undefined

export interface GetRequestParams {
  path: string
  cache?: 'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached'
  tags?: string[]
  revalidate?: number
  customUrl?: string
}

export interface MutationRequestParams {
  method: HttpMethod
  path: string
  body?: any
  headers?: any
  customUrl?: string
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'patch'

export interface CreateOrderRequest {
  products: CartItem[]
  details: OrderFormProps
}

export interface GetPreferenceRequest {
  products: CartItem[]
  orderData: OrderInterface
}

export type OrderType = 'active' | 'finished' | 'all'

export interface GetOrdersRequest {
  type: OrderType
  mode: 'shop' | 'user'
}

export interface OrderQueryParams {
  supabase: SupabaseClient
  userId?: string
  type: OrderType
}

export interface ImageUploadRequest {
  image: File | undefined
}

export interface ChangeOrderStatusRequest {
  status: OrderStatusApiEnum
  orderId: string
}

export interface GetProductRequest {
  id: string
}

export interface GetProductsRequest {
  ids?: string[] | null
}

export interface CreateProductRequest {
  product: ProductFormData
}

export interface PatchProductRequest {
  product: ProductFormData
  id: string
}

export interface DeleteProductRequest {
  id: string
}

export interface CreateMessageRequest {
  orderId: string
  message: string
}

export interface GetOrderMessagesRequest {
  orderId: string
}

export interface ChangeShopStatusRequest {
  isOpen: boolean
}

export interface CreateProfileRequest {
  formData: ProfileFormData
}

export interface PatchUserProfile {
  formData: ProfileFormData
  id: string
}

export interface GetProfileRequest {
  id?: string | null
}
