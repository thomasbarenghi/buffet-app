import { type PaymentMethods, type Profile } from '.'

export interface LoginFormData {
  email: string
  password: string
}

export interface AuthorizeBody {
  is_authorized: boolean
  userId: string
}

export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'role' | 'profile_image'>

export interface OrderFormProps {
  instructions: string
  payment_method: PaymentMethods
}

export interface ProductFormData {
  title: string
  price: number
  thumbnail?: string | File | FileList
  description: string
}
