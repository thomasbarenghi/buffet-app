'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Link, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import { AvatarMenu, Cart, HeaderMenu, MobileMenu } from '@/components'
import { routes } from '@/utils/constants'
import { type RawUserMeta } from '@/interfaces'

interface Props {
  withBorder?: boolean
  profile: RawUserMeta
}

const Brand = () => (
  <NavbarBrand>
    <Link href={routes.customer.HOME}>
      <Image src='/icons/logo.svg' width={103} height={30} alt='logo' />
    </Link>
  </NavbarBrand>
)

const Content = ({ withBorder = true, profile }: Props) => {
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
        <HeaderMenu profile={profile} />
        <div className='flex items-center justify-between gap-4'>
          {profile?.role === 'customer' && <Cart />}
          <div>
            <AvatarMenu profile={profile} />
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

export default Content
