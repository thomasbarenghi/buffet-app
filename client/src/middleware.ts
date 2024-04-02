/* eslint-disable curly */
import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { getUserProfile } from './services/api-server'
import { RoleEnum } from './interfaces'

enum RoutesEnum {
  Auth = '/auth',
  Onboarding = '/account/onboarding',
  Login = '/auth/login',
  Account = '/account'
}

const managementRoutes = ['/management']
const customerRoutes = ['/shop', '/account/active-orders']
const authRoutes = ['/auth']
const onboardingRoutes = ['/account/onboarding']

const pathStartsWith = (arr: string[], str: string) => arr.some((item) => str.startsWith(item))

const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const origin = req.nextUrl.origin
  const currentPath = req.nextUrl.pathname

  const supabase = createMiddlewareClient<Database>({ req, res })
  const { data } = await supabase.auth.getSession()

  const user = await supabase.auth.getUser()
  const profile = await getUserProfile(user.data.user?.id ?? '')

  const isLoggedIn = !!data.session?.access_token
  const hasProfile = !!profile.data?.id
  const role = profile.data?.role

  // General route protection
  if (!isLoggedIn && !pathStartsWith(authRoutes, currentPath)) return NextResponse.redirect(origin + RoutesEnum.Login)
  if (isLoggedIn && pathStartsWith(authRoutes, currentPath)) return NextResponse.redirect(origin + RoutesEnum.Account)

  // Onboarding executor
  if (!hasProfile && !pathStartsWith(onboardingRoutes, currentPath) && !pathStartsWith(authRoutes, currentPath))
    return NextResponse.redirect(origin + RoutesEnum.Onboarding)
  if (hasProfile && pathStartsWith(onboardingRoutes, currentPath) && !pathStartsWith(authRoutes, currentPath))
    return NextResponse.redirect(origin + RoutesEnum.Account)

  // Redirector according to role
  if (role === RoleEnum.Customer)
    if (pathStartsWith(managementRoutes, currentPath)) return NextResponse.redirect(origin + RoutesEnum.Account)
  if (role !== RoleEnum.Customer)
    if (pathStartsWith(customerRoutes, currentPath)) return NextResponse.redirect(origin + RoutesEnum.Account)

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
    // '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}

export default middleware
