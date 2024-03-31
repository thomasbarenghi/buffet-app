import { endpoints } from '@/utils/constants/endpoints.const'
import { getRequest, mutationRequest } from '../api.requests'
import { type Response, type Product, type ProductFormData } from '@/interfaces'
import { clientUrl } from '@/utils/constants/env.const'

export const getAllProducts = async (): Promise<Response<Product[]>> =>
  await getRequest<Product[]>({
    path: endpoints.products.FIND_ALL,
    cache: 'force-cache'
  })

export const getProduct = async (id: string): Promise<Response<Product>> =>
  await getRequest<Product>({
    path: endpoints.products.FIND_ONE(id),
    customUrl: clientUrl,
    cache: 'force-cache'
  })

export const createProduct = async (product: ProductFormData): Promise<Response<Product>> =>
  await mutationRequest<Product>({
    method: 'post',
    body: product,
    path: endpoints.products.CREATE_ONE,
    customUrl: clientUrl
  })

export const deleteProduct = async (id: string): Promise<Response<Product>> =>
  await mutationRequest<Product>({
    method: 'delete',
    path: endpoints.products.DELETE_ONE(id),
    customUrl: clientUrl
  })

export const patchProduct = async (product: ProductFormData, id: string): Promise<Response<Product>> =>
  await mutationRequest<Product>({
    method: 'patch',
    body: product,
    path: endpoints.products.PATCH_ONE(id),
    customUrl: clientUrl
  })
