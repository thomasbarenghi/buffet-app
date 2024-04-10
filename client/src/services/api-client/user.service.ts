import {
  type CreateProfileRequest,
  type AuthorizeBody,
  type Profile,
  type Response,
  type PatchUserProfile
} from '@/interfaces'
import { getRequest, mutationRequest } from '../api.requests'
import { endpoints } from '@/utils/constants'
import { clientUrl } from '@/utils/constants/env.const'

export const authorizeCash = async (formData: AuthorizeBody): Promise<Response<Profile>> =>
  await mutationRequest<Profile>({
    method: 'patch',
    body: formData,
    path: endpoints.users.AUTHORIZE_CASH,
    customUrl: clientUrl
  })

export const createUserProfile = async (req: CreateProfileRequest): Promise<Response<Profile>> =>
  await mutationRequest<Profile>({
    method: 'post',
    body: req,
    path: endpoints.users.CREATE_PROFILE,
    customUrl: clientUrl
  })

export const patchUserProfile = async (req: PatchUserProfile): Promise<Response<Profile>> =>
  await mutationRequest<Profile>({
    method: 'patch',
    body: req,
    path: endpoints.users.PATCH_PROFILE(req.id),
    customUrl: clientUrl
  })

export const getUserProfile = async (id?: string): Promise<Response<Profile>> =>
  await getRequest<Profile>({
    path: endpoints.users.FIND_PROFILE(id ?? 'null'),
    customUrl: clientUrl,
    cache: 'no-store'
  })
