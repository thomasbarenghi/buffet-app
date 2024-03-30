/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosResponse } from 'axios'
import { type HttpMethod, type Response, type GetRequestParams } from '@/interfaces'
import { serverUrl } from '@/utils/constants/env.const'

export const getRequest = async <T>(params: GetRequestParams): Promise<Response<T>> => {
  try {
    const axiosInstance = axios.create({
      baseURL: serverUrl
    })

    const response = await fetch(`${axiosInstance.defaults.baseURL}${params.url}`, {
      cache: params.cache,
      next: { revalidate: params.revalidate || undefined, tags: params.tags }
    })

    const responseData = await response.json()
    if (!response.ok) {
      const errorResponse: Response<T> = {
        data: null,
        error: { message: `Error en la solicitud GET a ${params.url}`, code: response.status }
      }
      return errorResponse
    }

    return { data: responseData, error: null }
  } catch (error: any) {
    return { data: null, error: { message: error.message, code: error.code || 500 } }
  }
}

export const mutationRequest = async <T>(
  method: HttpMethod,
  path: string,
  body?: any,
  headers?: any,
  customUrl?: string
): Promise<Response<T>> => {
  try {
    console.log(customUrl, path)

    const axiosInstance = axios.create({
      baseURL: customUrl && customUrl?.length > 1 ? customUrl : serverUrl
    })

    const axiosResponse: AxiosResponse<T> = await axiosInstance[method](path, body, headers)
    return { data: axiosResponse.data, error: null }
  } catch (error: any) {
    console.error(error)
    return { data: null, error: { message: error.message, code: error.response?.status || 500 } }
  }
}
