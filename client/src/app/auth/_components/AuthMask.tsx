import { type Metadata } from 'next'
import Link from 'next/link'
import { routes } from '@/utils/constants/routes.const'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Ingresar | LleGo!'
}

interface Props {
  children: React.ReactNode
  title: string
  description: string
  mode: 'login' | 'register' | 'none'
}

const AuthMask = ({ children, title, description, mode }: Props) => (
  <main className='flex flex-col items-center lg:bg-[#fcde9c]'>
    <section className='flex min-h-screen w-full grid-cols-[auto,_400px] flex-col items-center gap-9 2xl:container lg:grid lg:items-end  2xl:grid-cols-[auto,_500px] '>
      <div className=' hidden flex-col items-start justify-center gap-1 px-6 py-12 lg:flex'>
        <h1 className='text-[32px] font-light text-[#f44708] '>
          Estamos hablando de comida, <span className='font-semibold'>¿verdad?</span>
        </h1>
        <p className='w-[550px] font-light leading-[165%] text-[#f44708] '>
          ¡Olvídate de las dietas y las penas! Tenemos la solución a tus problemas:{' '}
          <span className='font-semibold'>¡Comida rica a precios que no te hacen llorar!</span> (como tu ex)
        </p>
      </div>
      <div className='flex h-full w-full max-w-md flex-grow flex-col items-center justify-center gap-10 bg-white px-6 py-12 sm:py-8 lg:px-10 2xl:max-w-lg'>
        <Image src='/icons/logo.svg' width={120} height={35} alt='logo' />
        <div className='flex w-full flex-col items-center gap-1 '>
          <h1 className='text-center text-2xl'>{title}</h1>
          <p className='text-light text-center'>{description}</p>
        </div>
        {children}
        {mode === 'login' ? (
          <Link href={routes.auth.REGISTER} className='flex w-full justify-center font-light'>
            <p className='text-center'>
              ¿No tienes una cuenta? <b className='font-semibold text-primary'>Registrate</b>
            </p>
          </Link>
        ) : mode === 'register' ? (
          <Link href={routes.auth.LOGIN} className='flex w-full justify-center font-light'>
            <p>
              ¿Ya tienes una cuenta? <b className='font-semibold text-primary'>Ingresa</b>
            </p>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </section>
  </main>
)

export default AuthMask
