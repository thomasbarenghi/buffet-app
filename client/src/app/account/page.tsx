import { Button, Footer, Header, OrdersGrid } from '@/components'
import { RoleEnum } from '@/interfaces'
import { getShopOrders } from '@/services/orders/get-shop-orders'
import { getUserOrders } from '@/services/orders/get-user-orders'
import { getProfile } from '@/services/user/get-profile.service'
import { routes } from '@/utils/constants/routes.const'
import { User } from '@nextui-org/react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// TODO: ACTUALIZAR EN CADA SOFTROUTING LAS ORDENES FINALIZADAS
// TODO: ORDENAR SEGUN ULTIMA ORDEN

const AccountPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')
  const orders =
    profile.data?.role === RoleEnum.Customer
      ? await getUserOrders(supabase, 'finished')
      : await getShopOrders(supabase, 'finished')

  return (
    <>
      <Header />
      <main className=' flex flex-col items-center pb-14 '>
        <section className='resp-pad-x flex w-full justify-center gap-6 bg-neutral-50  pb-9 pt-8  '>
          <div className='flex w-full items-center justify-between gap-4 2xl:container sm:flex-row'>
            <User
              name={profile.data?.first_name + ' ' + profile.data?.last_name}
              description={'DNI ' + profile.data?.dni}
              classNames={{
                name: 'text-medium sm:text-lg font-semibold',
                description: 'text-xs sm:text-sm text-neutral-600 font-light',
                base: 'flex gap-3'
              }}
              avatarProps={{
                src: `${profile.data?.profile_image}`,
                size: 'lg',
                radius: 'lg',
                classNames: {
                  img: 'sm:h-[80px] sm:min-w-[80px] h-[60px] min-w-[60px]',
                  base: 'sm:h-[80px] sm:min-w-[80px] h-[60px] min-w-[60px]'
                }
              }}
            />
            <Link href={routes.common.EDIT_ACCOUNT}>
              <Image src={'/icons/configuration.svg'} alt='configuration' height={30} width={30} />
            </Link>
          </div>
        </section>
        <section className='resp-pad-x flex w-full justify-center border-t bg-white pt-8 '>
          <div className='flex w-full flex-col items-start justify-start gap-4 2xl:container'>
            <div className='flex w-full items-center justify-between gap-3'>
              <h1 className='text-xl font-medium leading-tight sm:text-2xl'>Ultimas ordenes</h1>
              <div className='flex gap-2'>
                {profile.data?.role === RoleEnum.Customer && (
                  <Button title='Ver activas' size='md' href={routes.customer.ACTIVE_ORDERS} />
                )}
                {profile.data?.role !== RoleEnum.Customer && (
                  <Button title='Ver en curso' size='md' href={routes.attendant.HOME} />
                )}
                <Button
                  title='Ver finalizadas'
                  variant='flat'
                  className='hidden sm:flex'
                  size='md'
                  href={routes.common.ORDERS}
                />
              </div>
            </div>
            <OrdersGrid orders={orders?.data?.slice(0, 4) ?? []} mode={profile.data?.role ?? 'customer'} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AccountPage
