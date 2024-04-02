import { Button, OrdersGrid } from '@/components'
import { RoleEnum } from '@/interfaces'
import { getShopOrders, getUserOrders } from '@/services/api-server'
import { routes } from '@/utils/constants'
import { User } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { type Metadata } from 'next'
import { findUserMetaData } from '@/utils/functions'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cuenta | Buffet UNAHUR'
}
// TODO: ACTUALIZAR EN CADA SOFTROUTING LAS ORDENES FINALIZADAS
// TODO: ORDENAR SEGUN ULTIMA ORDEN

const AccountPage = async () => {
  const profile = await findUserMetaData()
  console.log('findUserData', profile)

  const orders = profile?.role === RoleEnum.Customer ? await getUserOrders('finished') : await getShopOrders('finished')

  return (
    <main className=' flex flex-col items-center pb-14 '>
      <section className='resp-pad-x flex w-full justify-center gap-6 bg-neutral-50  pb-9 pt-8  '>
        <div className='flex w-full items-center justify-between gap-4 2xl:container sm:flex-row'>
          <User
            name={profile.full_name}
            description={'DNI ' + profile.dni}
            classNames={{
              name: 'text-medium sm:text-lg font-semibold',
              description: 'text-xs sm:text-sm text-neutral-600 font-light',
              base: 'flex gap-3'
            }}
            avatarProps={{
              src: `${profile?.profile_image}`,
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
              {profile?.role === RoleEnum.Customer && (
                <Button title='Ver activas' size='md' href={routes.customer.ACTIVE_ORDERS} />
              )}
              {profile?.role !== RoleEnum.Customer && (
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
          <OrdersGrid orders={orders?.data?.slice(0, 4) ?? []} mode={profile?.role ?? 'customer'} />
        </div>
      </section>
    </main>
  )
}

export default AccountPage
