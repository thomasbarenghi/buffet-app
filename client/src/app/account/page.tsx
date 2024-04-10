import { type Metadata } from 'next'
import { Tooltip, User } from '@nextui-org/react'
import { OrdersGrid } from '@/components'
import { findCashAuthorization, getOrders } from '@/services/api-server'
import { findUserMetaData } from '@/utils/functions'
import { RoleEnum } from '@/interfaces'
import ActiveOrders from './_components/ActiveOrders'
import CheckIcon from '@/components/Assets/CheckIcon'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Cuenta | Buffet UNAHUR'
}

const AccountPage = async () => {
  const profile = await findUserMetaData()
  const cashAuthorization = await findCashAuthorization()
  const mode = profile?.role === RoleEnum.Customer ? 'user' : 'shop'
  const type = profile?.role === RoleEnum.Customer ? 'active' : 'finished'
  const orders = await getOrders({ mode, type })
  const isCashAuthorized = cashAuthorization.data?.is_authorized
  const primaryColor = isCashAuthorized ? '#FB5607' : '#C5C5C5'
  const secondaryColor = isCashAuthorized ? 'white' : 'white'
  const toolText = isCashAuthorized ? 'Validaste tu identidad' : 'Tu identidad no fue validada'
  return (
    <main className=' flex flex-col items-center bg-neutral-50 pb-14 '>
      <section className='resp-pad-x flex w-full justify-center gap-6 bg-white   pb-9 pt-8  '>
        <div className='flex w-full items-center justify-start gap-4 2xl:container sm:flex-row'>
          <User
            name={
              <div className='flex items-center gap-2'>
                <span>{profile.full_name}</span>
                {profile.role === 'customer' && (
                  <Tooltip size='sm' placement='right-end' content={toolText} color='default'>
                    <CheckIcon size={20} primaryColor={primaryColor} secondaryColor={secondaryColor} />
                  </Tooltip>
                )}
              </div>
            }
            description={'DNI ' + profile.dni}
            classNames={{
              name: 'text-medium text-lg font-semibold',
              description: 'text-sm text-neutral-600 font-light',
              base: 'flex gap-3'
            }}
            avatarProps={{
              src: `${profile?.profile_image}`,
              size: 'lg',
              radius: 'none',
              classNames: {
                img: 'sm:h-[80px] sm:min-w-[80px] h-[80px] min-w-[80px]  ',
                base: 'sm:h-[80px] sm:min-w-[80px] h-[80px] min-w-[80px] !rounded-[30px]'
              }
            }}
          />
        </div>
      </section>
      <section className='resp-pad-x flex w-full justify-center border-t bg-neutral-50 pt-10 '>
        <div className='flex w-full flex-col items-start justify-start gap-6 2xl:container'>
          <div className='flex w-full items-center justify-between gap-3'>
            {profile?.role === RoleEnum.Customer && (
              <h1 className='text-2xl font-light leading-tight'>
                Pedidos <span className='font-semibold'>en curso</span>
              </h1>
            )}
            {profile?.role !== RoleEnum.Customer && (
              <h1 className='text-2xl font-light leading-tight'>
                Pedidos <span className='font-semibold'>finalizados</span>
              </h1>
            )}
          </div>
          {profile?.role === RoleEnum.Customer && <ActiveOrders ordersFallback={orders.data ?? []} />}
          {profile?.role !== RoleEnum.Customer && <OrdersGrid orders={orders.data ?? []} mode={RoleEnum.Attendant} />}
        </div>
      </section>
    </main>
  )
}

export default AccountPage
