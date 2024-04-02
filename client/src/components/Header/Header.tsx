'use server'
import Content from './Content'
import { type Role } from '@/interfaces'
import { findUserMetaData } from '@/utils/functions'

interface Props {
  mode?: Role
  withBorder?: boolean
}

const Header = async ({ mode = 'customer', withBorder = true }: Props) => {
  const profile = await findUserMetaData()

  return <Content profile={profile} withBorder={withBorder} />
}

export default Header
