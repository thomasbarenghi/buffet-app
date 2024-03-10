/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { type AxiosResponse } from 'axios'
import { type HttpMethod, type Response, type GetRequestParams } from '@/interfaces'
import { serverUrl } from '@/utils/constants/env.const'

const axiosInstance = axios.create({
  baseURL: serverUrl
})

export const getRequest = async <T>(params: GetRequestParams): Promise<Response<T>> => {
  try {
    const response = await fetch(`${axiosInstance.defaults.baseURL}${params.url}`, {
      cache: params.cache || 'force-cache',
      next: { revalidate: params.validate || undefined }
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
  url: string,
  body?: any,
  headers?: any
): Promise<Response<T>> => {
  try {
    const axiosResponse: AxiosResponse<T> = await axiosInstance[method](url, body, headers)
    return { data: axiosResponse.data, error: null }
  } catch (error: any) {
    console.error(error)
    return { data: null, error: { message: error.message, code: error.response?.status || 500 } }
  }
}
