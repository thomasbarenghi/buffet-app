'use client'
import { type Profile } from '@/interfaces'
import { menu } from '@/lib/menu.lib'
import { Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

interface Props {
  isMenuOpen: boolean
  profile: Profile
}

const MobileMenu = ({ isMenuOpen, profile }: Props) => {
  const pathname = usePathname()
  return (
    <>
      <NavbarMenuToggle className='sm:hidden' aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      <NavbarMenu className='pt-14'>
        {menu[profile.role].map((element, index) => (
          <NavbarMenuItem isActive={pathname === element.href} key={index}>
            <Link
              className={pathname === element.href ? 'font-semibold' : 'font-light'}
              color={pathname === element.href ? 'primary' : 'foreground'}
              href={element.href}
              size='lg'
            >
              {element.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </>
  )
}

export default MobileMenu
