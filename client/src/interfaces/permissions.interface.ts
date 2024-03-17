import { type Role } from './user.interface'

export enum GeneralPermission {
  CreateSpace = 'createSpace',
  EditSpace = 'editSpace',
  DeleteSpace = 'deleteSpace',
  CreateRoom = 'createRoom',
  DeleteRoom = 'deleteRoom',
  EditMemberRole = 'editMemberRole',
  DeleteMember = 'deleteMember',
  DeleteTask = 'deleteTask',
  DeleteFile = 'deleteFile'
  // Agrega más permisos según tus necesidades
}

type RolePermissions = {
  [key in Role]: GeneralPermission[]
}

export const rolePermissions: RolePermissions = {
  customer: [
    GeneralPermission.CreateSpace,
    GeneralPermission.EditSpace,
    GeneralPermission.DeleteSpace,
    GeneralPermission.CreateRoom,
    GeneralPermission.DeleteRoom,
    GeneralPermission.EditMemberRole,
    GeneralPermission.DeleteMember,
    GeneralPermission.DeleteTask,
    GeneralPermission.DeleteFile
  ],
  attendant: [
    GeneralPermission.CreateSpace,
    GeneralPermission.EditSpace,
    GeneralPermission.CreateRoom,
    GeneralPermission.DeleteRoom,
    GeneralPermission.EditMemberRole,
    GeneralPermission.DeleteMember,
    GeneralPermission.DeleteTask,
    GeneralPermission.DeleteFile
  ],
  manager: [GeneralPermission.CreateSpace, GeneralPermission.DeleteTask],
  admin: [GeneralPermission.CreateSpace, GeneralPermission.DeleteTask]
  // Asigna los permisos según tus necesidades y roles
}
