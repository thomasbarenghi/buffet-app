import { Header, ProductOrderItem } from '@/components'
import { type OrderInterface } from '@/interfaces'
import { getUserOrders } from '@/services/orders/get-user-orders'
import { getProfile } from '@/services/user/get-profile.service'
import { routes } from '@/utils/constants/routes.const'
import { User } from '@nextui-org/react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

const AccountPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')
  const orders = await getUserOrders(supabase)
  return (
    <>
      <Header />
      <main className=' flex min-h-screen  flex-col items-center gap-9 px-6  py-4'>
        <section className='flex w-full items-center justify-between gap-6  2xl:container sm:flex-row'>
          <User
            name={profile.data?.first_name + ' ' + profile.data?.last_name}
            description='Cliente'
            classNames={{
              name: 'text-[18px] font-semibold',
              description: 'text-[14px] font-light',
              base: 'flex gap-3'
            }}
            avatarProps={{
              src: `${profile.data?.profile_image}`,
              size: 'lg',
              radius: 'lg',
              classNames: {
                img: 'h-[80px] w-auto aspect-square',
                base: 'w-auto h-auto'
              }
            }}
          />
          <Link href={routes.customer.ACCOUNT}>
            <Image src={'/icons/configuration.svg'} alt='configuration' height={30} width={30} />
          </Link>
        </section>
        <section className='flex w-full flex-grow flex-col gap-4 2xl:container'>
          <h1 className='text-[24px] font-semibold leading-tight'>Tus ordenes</h1>
          {Array.isArray(orders) &&
            orders?.map((order: OrderInterface, index) => <ProductOrderItem order={order} key={index} />)}
        </section>
      </main>
    </>
  )
}

export default AccountPage
