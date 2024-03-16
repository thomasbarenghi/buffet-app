import { type FunctionComponent } from 'react'
import Content from './_components/Content'
import { type Metadata } from 'next'
import { Footer, Header } from '@/components'

export const metadata: Metadata = {
  title: 'Checkout | Buffet UNAHUR'
}

const Checkout: FunctionComponent = async () => (
  <>
    <Header />
    <main className=' flex flex-col items-center pb-9'>
      <Content />
    </main>
    <Footer />
  </>
)

export default Checkout
