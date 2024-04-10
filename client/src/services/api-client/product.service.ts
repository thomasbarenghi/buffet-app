import { endpoints } from '@/utils/constants'
import { getRequest, mutationRequest } from '../api.requests'
import { type Response, type Product, type CreateProductRequest, type PatchProductRequest } from '@/interfaces'
import { clientUrl } from '@/utils/constants/env.const'

export const getAllProducts = async (ids: string): Promise<Response<Product[]>> =>
  await getRequest<Product[]>({
    path: endpoints.products.FIND_ALL(ids),
    cache: 'force-cache',
    customUrl: clientUrl
  })

export const getProduct = async (id: string): Promise<Response<Product>> =>
  await getRequest<Product>({
    path: endpoints.products.FIND_ONE(id),
    customUrl: clientUrl,
    cache: 'no-store'
  })

export const createProduct = async (req: CreateProductRequest): Promise<Response<Product>> =>
  await mutationRequest<Product>({
    method: 'post',
    body: req,
    path: endpoints.products.CREATE_ONE,
    customUrl: clientUrl,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const deleteProduct = async (id: string): Promise<Response<Product>> =>
  await mutationRequest<Product>({
    method: 'delete',
    path: endpoints.products.DELETE_ONE(id),
    customUrl: clientUrl,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const patchProduct = async (req: PatchProductRequest): Promise<Response<Product>> =>
  await mutationRequest<Product>({
    method: 'patch',
    body: req,
    path: endpoints.products.PATCH_ONE(req.id),
    customUrl: clientUrl,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
