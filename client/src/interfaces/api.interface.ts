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
  url: string
  cache?: 'default' | 'no-store' | 'reload' | 'force-cache' | 'only-if-cached'
  tags?: string[]
  revalidate?: number
}

export type HttpMethod = 'post' | 'put' | 'delete'
