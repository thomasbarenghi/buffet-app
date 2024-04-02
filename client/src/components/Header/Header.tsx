'use server'
import { HeaderContent } from '@/components'
import { findUserMetaData } from '@/utils/functions'

interface Props {
  withBorder?: boolean
}

const Header = async ({ withBorder = true }: Props) => {
  const profile = await findUserMetaData()
  return <HeaderContent profile={profile} withBorder={withBorder} />
}

export default Header
