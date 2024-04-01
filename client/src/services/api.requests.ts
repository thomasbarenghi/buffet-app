/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosResponse } from 'axios'
import { type Response, type GetRequestParams, type MutationRequestParams } from '@/interfaces'
import { serverUrl } from '@/utils/constants/env.const'

export const getRequest = async <T>(params: GetRequestParams): Promise<Response<T>> => {
  try {
    const axiosInstance = axios.create({
      baseURL: params.customUrl && params.customUrl?.length > 1 ? params.customUrl : serverUrl
    })

    const response = await fetch(`${axiosInstance.defaults.baseURL}${params.path}`, {
      cache: params.cache,
      next: { revalidate: params.revalidate || undefined, tags: params.tags }
    })

    const responseData = await response.json()
    if (!response.ok) {
      const errorResponse: Response<T> = {
        data: null,
        error: { message: `Error en la solicitud GET a ${params.path}`, code: response.status }
      }
      return errorResponse
    }

    return { data: responseData, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message, code: error.code || 500 } }
  }
}

export const mutationRequest = async <T>(params: MutationRequestParams): Promise<Response<T>> => {
  try {
    const axiosInstance = axios.create({
      baseURL: params.customUrl && params.customUrl?.length > 1 ? params.customUrl : serverUrl
    })

    const axiosResponse: AxiosResponse<T> = await axiosInstance({
      method: params.method,
      url: params.path,
      data: params.body,
      headers: params.headers
    })

    return { data: axiosResponse.data, error: null }
  } catch (error: any) {
    console.error(error)
    return { data: null, error: { message: error.message, code: error.response?.status || 500 } }
  }
}
