import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserProfile } from './services/api-server'

enum RoutesEnum {
  Auth = '/auth',
  Management = '/management',
  Onboarding = '/account/onboarding',
  Login = '/auth/login',
  Shop = '/shop',
  Account = '/account'
}

const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data } = await supabase.auth.getSession()
  const user = await supabase.auth.getUser()
  const profile = await getUserProfile(user.data.user?.id ?? '')
  const origin = req.nextUrl.origin
  const isLoggedIn = !!data.session?.access_token
  const hasProfile = !!profile.data?.id
  const role = profile.data?.role

  // Proteccion general de rutas
  if (!isLoggedIn && !req.nextUrl.pathname.startsWith(RoutesEnum.Auth)) {
    return NextResponse.redirect(origin + RoutesEnum.Login)
  } else if (data.session?.access_token && req.nextUrl.pathname.startsWith(RoutesEnum.Auth)) {
    return NextResponse.redirect(origin + RoutesEnum.Account)
  }

  // Ejecutor de onboarding
  if (
    !hasProfile &&
    req.nextUrl.pathname !== RoutesEnum.Onboarding &&
    !req.nextUrl.pathname.startsWith(RoutesEnum.Auth)
  ) {
    return NextResponse.redirect(origin + RoutesEnum.Onboarding)
  } else if (
    profile.data?.id &&
    req.nextUrl.pathname === RoutesEnum.Onboarding &&
    !req.nextUrl.pathname.startsWith(RoutesEnum.Auth)
  ) {
    return NextResponse.redirect(origin + RoutesEnum.Account)
  }

  // Redirector segun rol
  if (role === 'customer' && req.nextUrl.pathname.startsWith(RoutesEnum.Management)) {
    return NextResponse.redirect(origin + RoutesEnum.Account)
  } else if (role !== 'customer' && req.nextUrl.pathname.startsWith(RoutesEnum.Shop)) {
    return NextResponse.redirect(origin + RoutesEnum.Management)
  }

  return res
}

export const config = {
  matcher: [
    '/auth/:path*',
    '/shop',
    '/shop/:path*',
    '/account',
    '/account/:path*',
    '/management',
    '/management/:path*'
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
