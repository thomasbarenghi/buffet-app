import { type Metadata } from 'next'
import { UsersTable } from '@/components'
import { getAllCustomers } from '@/services/api-server'

export const metadata: Metadata = {
  title: 'Pagos en efectivo | Administracion | Buffet UNAHUR'
}

const Cash = async () => {
  const users = await getAllCustomers()
  return (
    <section className='flex w-full flex-col gap-4'>
      <h1 className='text-2xl font-light leading-tight'>
        <span className='font-semibold'>Autorizar</span> pagos en efectivo
      </h1>
      <UsersTable users={users.data ?? []} />
    </section>
  )
}

export default Cash
