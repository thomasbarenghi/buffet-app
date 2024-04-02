import { type Role } from './user.interface'

export enum GeneralPermission {}

type RolePermissions = {
  [key in Role]: GeneralPermission[]
}

export const rolePermissions: RolePermissions = {
  customer: [],
  attendant: [],
  manager: [],
  admin: []
}
