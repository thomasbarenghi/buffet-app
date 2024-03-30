'use client'
import { useEffect, useState, type FunctionComponent } from 'react'
import { type Role, type OrderInterface, type Profile } from '@/interfaces'
import { ProductOrderItem } from '..'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getProfile } from '@/services/user/get-profile.service'
import dynamic from 'next/dynamic'
const OrderItemGroupPlaceholder = dynamic(async () => await import('./Placeholders/OrderItemGroup'))
interface Props {
  orders: OrderInterface[]
  withTitle?: boolean
  mode: Role
}

const OrdersGrid: FunctionComponent<Props> = ({ orders, mode }) => {
  const supabase = createClientComponentClient<Database>()
  const [profile, setProfile] = useState<Profile | null>()

  const handleProfile = async () => {
    const res = await getProfile((await supabase.auth.getUser()).data.user?.id ?? '')
    setProfile((prev) => res.data)
  }

  useEffect(() => {
    void handleProfile()
  }, [])

  return (
    <div className='flex w-full flex-grow flex-col gap-4 2xl:container'>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders?.map((order: OrderInterface, index) => (
          <ProductOrderItem order={order} mode={mode} key={index} profile={profile!} />
        ))
      ) : (
        <OrderItemGroupPlaceholder
          title={
            <h1 className='text-center text-[18px] font-light'>
              Parece que aun <span className='font-semibold'>no hay nada por aquí</span>
            </h1>
          }
        />
      )}
    </div>
  )
}

export default OrdersGrid
