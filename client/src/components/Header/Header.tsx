'use server'
import { getUserProfile } from '@/services/api-server'
import Content from './Content'
import { type Role } from '@/interfaces'

interface Props {
  mode?: Role
  withBorder?: boolean
}

const Header = async ({ mode = 'customer', withBorder = true }: Props) => {
  const profile = await getUserProfile()
  if (!profile.data) return

  return <Content profile={profile.data} mode={mode} withBorder={withBorder} />
}

export default Header
