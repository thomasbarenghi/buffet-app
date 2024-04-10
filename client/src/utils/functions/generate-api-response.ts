/* eslint-disable @typescript-eslint/indent */
import { type GeneralError } from '@/interfaces'
import { type PostgrestError } from '@supabase/supabase-js'

interface ApiErrorResponse {
  error:
    | {
        message: string
        error?: unknown
      }
    | PostgrestError
    | GeneralError
  status: number | string
}

export const generateErrorResponse = ({ error, status }: ApiErrorResponse) =>
  new Response(
    JSON.stringify({
      message: error?.message,
      error
    }),
    {
      status: typeof status === 'number' ? status : parseInt(status),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

export const generateApiResponse = ({ error, status }: ApiErrorResponse) =>
  new Response(
    JSON.stringify({
      message: error?.message,
      error
    }),
    {
      status: typeof status === 'number' ? status : parseInt(status),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
