'use client'
import { OrdersGrid } from '@/components'
import { Tab, Tabs } from '@nextui-org/react'
import Form from './Form'

const Content = ({ profile, orders }: any) => (
  <Tabs
    variant='solid'
    color='primary'
    classNames={{
      base: 'grid',
      panel: 'w-full',
      tabList: 'bg-white border',
      tabContent: 'group-data-[selected=true]:text-primary group-data-[selected=true]:font-medium text-black text-sm',
      cursor: 'group-data-[selected=true]:bg-orange-100'
    }}
  >
    <Tab key='1' title='Pedidos en curso'>
      <OrdersGrid orders={orders?.data?.slice(0, 4) ?? []} mode={profile?.role ?? 'customer'} />
    </Tab>
    <Tab key='2' title='Pedidos finalizadas'>
      <OrdersGrid orders={orders?.data?.slice(0, 4) ?? []} mode={profile?.role ?? 'customer'} />
    </Tab>
    <Tab key='3' title='Editar perfil'>
      <Form profile={profile} />
    </Tab>
  </Tabs>
)

export default Content
