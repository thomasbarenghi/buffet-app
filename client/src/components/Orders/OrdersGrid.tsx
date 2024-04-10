'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ProductOrderItem } from '@/components'
import { getUserProfile } from '@/services/api-client'
import { type Role, type OrderInterface, type Profile } from '@/interfaces'
const OrderItemGroupPlaceholder = dynamic(async () => await import('./Placeholders/ItemGroup'))

interface Props {
  orders: OrderInterface[] | undefined
  withTitle?: boolean
  mode: Role
}

const OrdersGrid = ({ orders, mode }: Props) => {
  const [profile, setProfile] = useState<Profile | null>()

  const handleProfile = async () => {
    const res = await getUserProfile()
    setProfile((prev) => res.data)
  }

  useEffect(() => {
    void handleProfile()
  }, [])

  return (
    <div className='flex w-full flex-grow flex-col gap-4 2xl:container'>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders?.map((order, index) => <ProductOrderItem order={order} mode={mode} key={index} profile={profile!} />)
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
