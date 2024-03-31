import { type PostgrestError } from '@supabase/supabase-js'

export const generateErrorResponse = (error: PostgrestError) => {
  const responseObj = {
    message: error.message,
    error
  }

  return Response.json(responseObj, {
    status: parseInt(error.code),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
