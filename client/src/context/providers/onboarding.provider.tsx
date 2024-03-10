import { getProfile } from '@/services/user/get-profile.service'
import { routes } from '@/utils/constants/routes.const'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const OnboardingProvider: FunctionComponent<Props> = async ({ children }) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const { data } = await supabase.auth.getSession()
  const profile = await getProfile(user.data.user?.id ?? '')

  if (data.session?.access_token && !profile.data?.id) {
    redirect(routes.customer.ONBOARDING)
  }

  return <>{children}</>
}

export default OnboardingProvider
