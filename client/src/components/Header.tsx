'use client'
import React, { useState } from 'react'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import Image from 'next/image'
import Cart from './Cart'
import { routes } from '@/utils/constants/routes.const'
import { usePathname } from 'next/navigation'
import { generalMenu } from '@/lib/menu.lib'

const menuItems = ['Perfil', 'Tienda', 'Pedidos', 'Cerrar sesión']

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: 'py-4 resp-pad-x',
        wrapper: 'px-0 w-full max-w-none 2xl:container'
      }}
    >
      <NavbarBrand>
        <Link href={routes.customer.HOME}>
          <Image src='/icons/logo.svg' width={103} height={30} alt='logo' />
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end' className='sm:gap-10'>
        <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
          {generalMenu.map((element, index) => (
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
        <Cart />
        <NavbarMenuToggle className='sm:hidden' aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className='w-full'
              color={index === 2 ? 'warning' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header
