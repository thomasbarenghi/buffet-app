import { Footer, Header } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

// TODO: ENVIAR MODE AL HEADER PARA OCULTAR EL LOGO ORIGINAL Y EL MENU, ENTRE OTROS

const ManagerLayout: FunctionComponent<Props> = async ({ children }) => (
  <>
    <Header />
    <main className=' mt-[-89px] flex min-h-screen flex-col items-center justify-stretch bg-neutral-50'>
      <section className='grid w-full flex-grow 2xl:container '>
        <div className='resp-pad-x mt-[89px] flex w-full flex-col gap-5 py-10'>{children}</div>
      </section>
    </main>
    <Footer />
  </>
)

export default ManagerLayout
