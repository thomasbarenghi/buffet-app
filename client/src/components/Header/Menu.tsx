'use client'
import { type Profile } from '@/interfaces'
import { menu } from '@/lib/menu.lib'
import { Link, NavbarContent, NavbarItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'

const Menu = ({ profile }: { profile: Profile }) => {
  const pathname = usePathname()
  return (
    <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
      {menu[profile.role].map((element, index) => (
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
