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
    <main className='resp-pad-x flex min-h-[70vh] flex-col items-center gap-9 pb-[40px] pt-4'>
      <Content />
    </main>
    <Footer />
  </>
)

export default Checkout
