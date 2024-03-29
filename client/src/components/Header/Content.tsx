'use client'
import React, { useState } from 'react'
import { Link, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import Image from 'next/image'
import Cart from '../Cart'
import { routes } from '@/utils/constants/routes.const'
import { type Role, type Profile } from '@/interfaces'
import AvatarMenu from './AvatarMenu'
import MobileMenu from './MobileMenu'
import Menu from './Menu'

interface Props {
  mode?: Role
  withBorder?: boolean
  profile: Profile
}

const Brand = () => (
  <NavbarBrand>
    <Link href={routes.customer.HOME}>
      <Image src='/icons/logo.svg' width={103} height={30} alt='logo' />
    </Link>
  </NavbarBrand>
)

const Content = ({ mode = 'customer', withBorder = true, profile }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: `py-3 resp-pad-x ${withBorder ? 'border-b' : ''}`,
        wrapper: 'px-0 w-full max-w-none 2xl:container'
      }}
    >
      <NavbarContent>
        <MobileMenu profile={profile} isMenuOpen={isMenuOpen} />
        <Brand />
      </NavbarContent>
      <NavbarContent justify='end' className='sm:gap-10'>
        <Menu profile={profile} />
        <div className='flex items-center justify-between gap-4'>
          {profile.role === 'customer' && <Cart />}
          <div>
            <AvatarMenu profile={profile} />
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

export default Content
