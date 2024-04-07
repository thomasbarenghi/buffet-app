'use client'
import { usePathname } from 'next/navigation'
import { Link, NavbarContent, NavbarItem } from '@nextui-org/react'
import { menu } from '@/utils/constants'
import { type RawUserMeta, RoleEnum } from '@/interfaces'

const Menu = ({ profile }: { profile: RawUserMeta }) => {
  const pathname = usePathname()
  const role = profile?.role ?? RoleEnum.Customer
  return (
    <NavbarContent className='hidden gap-6 sm:flex' justify='center'>
      {menu[role].map((element, index) => (
        <NavbarItem isActive={pathname === element.href} key={index}>
          <Link
            className={pathname === element.href ? 'font-semibold' : 'font-light'}
            color={pathname === element.href ? 'primary' : 'foreground'}
            href={element.href}
          >
            {element.title}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  )
}

export default Menu
