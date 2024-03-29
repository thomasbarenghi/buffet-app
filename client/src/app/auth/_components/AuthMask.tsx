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

const authLinks = {
  login: {
    text: '¿No tienes una cuenta? ',
    linkText: 'Registrate',
    href: routes.auth.REGISTER
  },
  register: {
    text: '¿Ya tienes una cuenta? ',
    linkText: 'Ingresa',
    href: routes.auth.LOGIN
  }
}

const AuthMask = ({ children, title, description, mode }: Props) => (
  <main className='flex flex-col items-center lg:bg-[#ffddcd]'>
    <Image src='/images/auth-bg-new.jpeg' fill className='z-[0] object-cover' alt='bg' />
    <section className='z-[1] flex min-h-screen w-full grid-cols-[400px,_auto] flex-col items-center gap-9 2xl:container lg:grid lg:items-end  2xl:grid-cols-[600px,_auto] '>
      <div className='flex h-full w-full flex-grow  items-center justify-center   bg-white px-6 py-12 sm:py-8 lg:px-10 '>
        <div className='flex h-full w-full max-w-sm flex-col items-center justify-center  gap-10 '>
          <Image src='/icons/logo.svg' width={120} height={35} alt='logo' />
          <div className='flex w-full flex-col items-center gap-1 '>
            <h1 className='text-center text-xl'>{title}</h1>
            <p className='text-center font-light'>{description}</p>
          </div>
          {children}
          {mode === 'login' || mode === 'register' ? (
            <Link href={authLinks[mode].href} className='flex w-full justify-center font-light'>
              <p className='text-center'>
                {authLinks[mode].text}
                <b className='font-semibold text-primary'>{authLinks[mode].linkText}</b>
              </p>
            </Link>
          ) : null}
        </div>
      </div>
      <div className='hidden flex-col items-start justify-center gap-1 px-6 py-12 lg:flex'>
        {/* <h1 className='text-3xl font-light text-[#cb4c08] '>
          Estamos hablando de comida, <span className='font-semibold'>¿verdad?</span>
        </h1>
        <p className='w-[550px] font-light leading-[165%] text-[#f44708] '>
          ¡Olvídate de las dietas y las penas! Tenemos la solución a tus problemas:{' '}
          <span className='font-semibold'>¡Comida rica a precios que no te hacen llorar!</span> (como tu ex)
        </p> */}
      </div>
    </section>
  </main>
)

export default AuthMask

// import { type Metadata } from 'next'
// import Link from 'next/link'
// import { routes } from '@/utils/constants/routes.const'
// import Image from 'next/image'

// export const metadata: Metadata = {
//   title: 'Ingresar | LleGo!'
// }

// interface Props {
//   children: React.ReactNode
//   title: string
//   description: string
//   mode: 'login' | 'register' | 'none'
// }

// const AuthMask = ({ children, title, description, mode }: Props) => (
//   <main className='flex flex-col items-center lg:bg-[#fcde9c]'>
//     <section className='flex min-h-screen w-full grid-cols-[auto,_400px] flex-col items-center gap-9 2xl:container lg:grid lg:items-end  2xl:grid-cols-[auto,_500px] '>
//       <div className=' hidden flex-col items-start justify-center gap-1 px-6 py-12 lg:flex'>
//         <h1 className='text-3xl font-light text-[#f44708] '>
//           Estamos hablando de comida, <span className='font-semibold'>¿verdad?</span>
//         </h1>
//         <p className='w-[550px] font-light leading-[165%] text-[#f44708] '>
//           ¡Olvídate de las dietas y las penas! Tenemos la solución a tus problemas:{' '}
//           <span className='font-semibold'>¡Comida rica a precios que no te hacen llorar!</span> (como tu ex)
//         </p>
//       </div>
//       <div className='flex h-full w-full max-w-md flex-grow flex-col items-center justify-center gap-10 bg-white px-6 py-12 sm:py-8 lg:px-10 2xl:max-w-lg'>
//         <Image src='/icons/logo.svg' width={120} height={35} alt='logo' />
//         <div className='flex w-full flex-col items-center gap-1 '>
//           <h1 className='text-center text-2xl'>{title}</h1>
//           <p className='text-light text-center'>{description}</p>
//         </div>
//         {children}
//         {mode === 'login' ? (
//           <Link href={routes.auth.REGISTER} className='flex w-full justify-center font-light'>
//             <p className='text-center'>
//               ¿No tienes una cuenta? <b className='font-semibold text-primary'>Registrate</b>
//             </p>
//           </Link>
//         ) : mode === 'register' ? (
//           <Link href={routes.auth.LOGIN} className='flex w-full justify-center font-light'>
//             <p>
//               ¿Ya tienes una cuenta? <b className='font-semibold text-primary'>Ingresa</b>
//             </p>
//           </Link>
//         ) : (
//           <></>
//         )}
//       </div>
//     </section>
//   </main>
// )

// export default AuthMask
