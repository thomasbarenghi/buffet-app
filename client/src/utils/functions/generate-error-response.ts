import { type PostgrestError } from '@supabase/supabase-js'

export const generateErrorResponse = (error: PostgrestError) =>
  new Response(
    JSON.stringify({
      message: error.message,
      error
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
