import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getProfile } from './services/user/get-profile.service'

const middleware = async (req: NextRequest) => {
  const onboarding = '/account/onboarding'
  const authUrl = '/auth'
  const res = NextResponse.next()
  const origin = req.nextUrl.origin
  // Create a Supabase client configured to use cookies

  const supabase = createMiddlewareClient<Database>({ req, res })

  // Refresh session if expired - required for Server Components
  const { data } = await supabase.auth.getSession()
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')

  if (!data.session?.access_token && !req.nextUrl.pathname.startsWith(authUrl)) {
    return NextResponse.redirect(origin + authUrl + '/login')
  } else if (data.session?.access_token && req.nextUrl.pathname.startsWith(authUrl)) {
    return NextResponse.redirect(origin + '/shop')
  }

  if (!profile.data?.id && req.nextUrl.pathname !== onboarding && !req.nextUrl.pathname.startsWith(authUrl)) {
    return NextResponse.redirect(origin + onboarding)
  } else if (profile.data?.id && req.nextUrl.pathname === onboarding && !req.nextUrl.pathname.startsWith(authUrl)) {
    return NextResponse.redirect(origin + '/shop')
  }

  return res
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    '/auth/:path*',
    '/shop',
    '/shop/:path*',
    '/account',
    '/account/:path*'
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
