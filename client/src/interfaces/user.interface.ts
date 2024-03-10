import { type Shop } from '.'

export interface Profile {
  id: string
  created_at: Date
  first_name: string
  last_name: string
  role: Type
  dni: number
  profile_image: string
}
export interface User {
  id: string
  firstName: string
  lastName: string
  type: Type
  shop?: Shop | null
  shopId?: string | null
  email: string
  birthdate: Date | string
  password: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export type Type = 'customer' | 'dealer' | 'shop'
