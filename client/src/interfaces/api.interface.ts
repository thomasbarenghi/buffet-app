/* eslint-disable @typescript-eslint/indent */
import { type PostgrestError } from '@supabase/supabase-js'

export interface Response<T> {
  data: T | null
  error:
    | {
        message: string
        code: number
      }
    | null
    | PostgrestError
}

export interface GetRequestParams {
  path: string
  cache?: 'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached'
  tags?: string[]
  revalidate?: number
  customUrl?: string
}

export interface MutationRequestParams {
  method: HttpMethod
  path: string
  body?: any
  headers?: any
  customUrl?: string
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'patch'
