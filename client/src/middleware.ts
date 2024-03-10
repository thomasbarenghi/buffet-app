import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

const middleware = async (req: NextRequest) => {
  const authUrl = '/auth'
  const res = NextResponse.next()
  const origin = req.nextUrl.origin
  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  const { data } = await supabase.auth.getSession()

  if (!data.session?.access_token && !req.nextUrl.pathname.startsWith(authUrl)) {
    return NextResponse.redirect(origin + authUrl + '/login')
  }

  if (data.session?.access_token && req.nextUrl.pathname.startsWith(authUrl)) {
    return NextResponse.redirect(origin + '/shop')
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/shop'
    // '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}

export default middleware
