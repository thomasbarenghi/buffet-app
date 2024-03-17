'use server'
import { getProfile } from '@/services/user/get-profile.service'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Content from './Content'
import { type Role } from '@/interfaces'

interface Props {
  mode?: Role
  withBorder?: boolean
}

const Header = async ({ mode = 'customer', withBorder = true }: Props) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')

  return <Content profile={profile.data!} mode={mode} withBorder={withBorder} />
}

export default Header
