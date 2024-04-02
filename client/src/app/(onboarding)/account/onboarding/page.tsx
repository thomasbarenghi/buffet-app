import Image from 'next/image'
import { type Metadata } from 'next'
import Form from './_components/Form'

export const metadata: Metadata = {
  title: 'Onboarding | Buffet UNAHUR'
}

const OnboardingPage = async () => (
  <main className='flex min-h-screen w-full flex-col items-center gap-9 px-6 py-16'>
    <section className='flex max-w-md flex-col gap-2 2xl:container'>
      <Image src='/icons/mini-logo.svg' height={40} width={40} alt='logo' />
      <h1 className='mt-1 text-3xl font-light leading-tight'>
        Ya casi terminamos, ya casi podes <span className='font-semibold'>usar Buffet.</span>
      </h1>
      <p className='font-light text-zinc-700'>
        Creamos esta app para hacer <span className='font-semibold text-black'>tu vida mas facil.</span> Creado por
        alumnos de la UNAHUR, para alumnos de la UNAHUR.
      </p>
    </section>
    <section className='w-full max-w-md'>
      <Form />
    </section>
  </main>
)

export default OnboardingPage
