import { type FunctionComponent } from 'react'
// import { getServerSession } from 'next-auth'
// import authOptions from '@/app/api/auth/[...nextauth]/auth.const'
import Content from './_components/Content'
import { type Metadata } from 'next'
import { Header } from '@/components'

export const metadata: Metadata = {
  title: 'Checkout | Buffet UNAHUR'
}

const Checkout: FunctionComponent = async () => (
  // const session = await getServerSession(authOptions)
  // if (!session) return null
  <>
    <Header />
    <main className='flex min-h-screen flex-col  items-center gap-9 px-6 py-4'>
      <Content userId='session?.user?.id' />
    </main>
  </>
)

export default Checkout
