import { type PostgrestError } from '@supabase/supabase-js'

export const generateErrorResponse = (error: PostgrestError) => {
  console.log(error)

  // return Response.json(responseObj, {
  //   status: 500,
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })

  return new Response(
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
}
