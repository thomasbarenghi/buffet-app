import { type Profile, type User } from '.'

export interface LoginFormData {
  email: string
  password: string
}

export type ProfileFormData = Omit<Profile, 'id' | 'created_at' | 'role' | 'profile_image'>

export type RegisterFormData = Omit<User, 'id'>

export type AccountFormProps = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'birthdate' | 'password'>

export interface PasswordFormProps {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}

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
