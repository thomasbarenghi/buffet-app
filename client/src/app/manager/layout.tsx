import { Header } from '@/components'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const ManagerLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <Header withBorder />
    <main className=' flex min-h-screen flex-col items-center justify-stretch'>
      <section className='grid w-full  flex-grow border-x 2xl:container lg:grid-cols-[250px_auto]'>
        <div className='relative flex w-full flex-col justify-start border-b border-r md:border-b-0'>
          <div className='sticky top-[97px] flex flex-col items-center '>
            <div className='relative min-h-[200px] w-full lg:aspect-video lg:min-w-0'>
              <Image
                src='https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='name'
                fill
                className='z-[0] object-cover '
              />
            </div>
            <div className='resp-pad-x z-[1] flex  w-full flex-col items-start gap-1 py-5 lg:px-5'>
              <h1 className='text-xl font-medium text-primary'>Panel administrativo</h1>
              <p className='text-sm font-light'>
                Con este panel puedes tener el control total de Buffet. Gestiona pedidos, configura el sistema. Toma
                decisiones estratégicas.
              </p>
            </div>
          </div>
        </div>
        <div className='resp-pad-x flex w-full flex-col gap-5 py-10'>{children}</div>
      </section>
    </main>
  </>
)

export default ManagerLayout
