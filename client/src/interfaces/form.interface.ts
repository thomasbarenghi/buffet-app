import { type Profile } from '.'

export interface LoginFormData {
  email: string
  password: string
}

export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'role' | 'profile_image'>

export interface ShippingFormProps {
  instructions: string
}

export interface OrderFormProps {
  instructions: string
  client: string
  products: string[]
}

export interface ProductFormData {
  title: string
  price: number
  thumbnail?: string | File | FileList
  description: string
}
