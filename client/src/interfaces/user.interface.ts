export interface Profile {
  id: string
  created_at: string
  first_name: string
  last_name: string
  role: Role
  dni: number
  profile_image: string
}

export interface RawUserMeta {
  full_name: string
  first_name: string
  last_name: string
  role: Role
  dni: number
  profile_image: string
  id: string
}

export interface User {
  id: string
  email: string
}

export enum RoleEnum {
  Customer = 'customer',
  Attendant = 'attendant',
  Manager = 'manager',
  Admin = 'admin'
}

export type Role = 'customer' | 'attendant' | 'manager' | 'admin'
