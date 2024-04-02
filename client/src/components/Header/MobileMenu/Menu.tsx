'use client'
import { type RawUserMeta, RoleEnum } from '@/interfaces'
import { menu } from '@/utils/constants'
import { Link, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

interface Props {
  profile: RawUserMeta
}

const Menu = ({ profile }: Props) => {
  const pathname = usePathname()
  const role = profile?.role ?? RoleEnum.Customer
  return (
    <NavbarMenu className='pt-14'>
      {menu[role].map((element, index) => (
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
  )
}

export default Menu
