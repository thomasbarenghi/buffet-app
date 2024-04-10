import { type Response } from '@/interfaces'

export const generateServiceError = (code: number, message: string): Response<any> => ({
  data: null,
  error: {
    code,
    message
  }
})
