'use client'
import { type RawUserMeta } from '@/interfaces'
import { NavbarMenuToggle } from '@nextui-org/react'
import dynamic from 'next/dynamic'
const Menu = dynamic(async () => await import('./Menu'))

interface Props {
  isMenuOpen: boolean
  profile: RawUserMeta
}

const MobileMenu = ({ isMenuOpen, profile }: Props) => (
  <>
    <NavbarMenuToggle className='sm:hidden' aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
    <Menu profile={profile} />
  </>
)

export default MobileMenu
