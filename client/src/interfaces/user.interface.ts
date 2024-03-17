export interface Profile {
  id: string
  created_at: Date
  first_name: string
  last_name: string
  role: Role
  dni: number
  profile_image: string
}
export interface User {
  id: string
  firstName: string
  lastName: string
  type: Role
  shopId?: string | null
  email: string
  birthdate: Date | string
  password: string
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export enum RoleEnum {
  Customer = 'customer',
  Attendant = 'attendant',
  Manager = 'manager',
  Admin = 'admin'
}

export type Role = 'customer' | 'attendant' | 'manager' | 'admin'
