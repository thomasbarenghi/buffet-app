import { routes } from '@/utils/constants/routes.const'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Home = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const session = await supabase.auth.getSession()

  if (!session.data.session?.access_token) {
    redirect(routes.auth.LOGIN)
  } else {
    redirect(routes.customer.ACCOUNT)
  }

  return <></>
}

export default Home
