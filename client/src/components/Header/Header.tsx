'use server'
import Image from 'next/image'
import { Link, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react'
import { AvatarMenu, Cart, HeaderMenu } from '@/components'
import { routes } from '@/utils/constants'
import { cookies } from 'next/headers'
import { getAllProducts } from '@/services/api-server'
import { findUserMetaData } from '@/utils/functions'

interface Props {
  withBorder?: boolean
}

const Brand = () => (
  <NavbarBrand>
    <Link href={routes.customer.HOME}>
      <Image src='/icons/logo.svg' width={103} height={30} alt='logo' />
    </Link>
  </NavbarBrand>
)

const Header = async ({ withBorder = true }: Props) => {
  const profile = await findUserMetaData()
  const cookieStore = cookies()
  const cartItemsStr = cookieStore.get('cartItems')
  const cartItems = await getAllProducts({ ids: cartItemsStr?.value.split(',') })

  return (
    // const [isMenuOpen, setIsMenuOpen] = useState(false)
    <Navbar
      shouldHideOnScroll
      // onMenuOpenChange={setIsMenuOpen}
      classNames={{
        base: `py-3 resp-pad-x ${withBorder ? 'border-b' : ''}`,
        wrapper: 'px-0 w-full max-w-none 2xl:container'
      }}
    >
      <NavbarContent>
        {/* <MobileMenu profile={profile} isMenuOpen={isMenuOpen} /> */}
        <Brand />
      </NavbarContent>
      <NavbarContent justify='end' className='sm:gap-10'>
        <HeaderMenu profile={profile} />
        <div className='flex items-center justify-between gap-4'>
          {profile?.role === 'customer' && <Cart itemsFallback={cartItems.data ?? []} />}
          <div>
            <AvatarMenu profile={profile} />
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
