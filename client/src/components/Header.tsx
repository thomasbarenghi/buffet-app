'use client'
import React, { useState } from 'react'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import Image from 'next/image'
import Cart from './Cart'

const menuItems = ['Perfil', 'Tienda', 'Pedidos', 'Cerrar sesión']

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: 'py-4',
        wrapper: 'px-6'
      }}
    >
      <NavbarBrand>
        <Image src='/icons/logo.svg' width={103} height={30} alt='logo' />
      </NavbarBrand>
      <NavbarContent className='sm:hidden' justify='end'>
        <Cart />
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
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
