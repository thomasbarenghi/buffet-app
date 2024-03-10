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
  <main className='flex min-h-screen flex-col  items-center gap-9 px-6 py-12'>
    <div className='flex w-full flex-col items-center gap-12'>
      <Image src='/icons/logo.svg' width={120} height={35} alt='logo' />
      <div className='flex w-full flex-col items-center gap-1 '>
        <h1 className='text-2xl'>{title}</h1>
        <p className='text-light'>{description}</p>
      </div>
      {children}
      {mode === 'login' ? (
        <Link href={routes.auth.REGISTER} className='flex w-full justify-center font-light'>
          <p>
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
  </main>
)

export default AuthMask
