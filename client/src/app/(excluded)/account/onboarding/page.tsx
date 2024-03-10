import Image from 'next/image'
import Form from './_components/Form'
import { routes } from '@/utils/constants/routes.const'
import { getProfile } from '@/services/user/get-profile.service'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const OnboardingPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const { data } = await supabase.auth.getSession()
  const profile = await getProfile(user.data.user?.id ?? '')

  if (data.session?.access_token && profile.data?.id) {
    redirect(routes.customer.HOME)
  }

  return (
    <main className='flex min-h-screen w-full flex-col items-center gap-9 px-6 py-16'>
      <section className='flex flex-col gap-2 2xl:container'>
        <Image src='/icons/mini-logo.svg' height={40} width={40} alt='logo' />
        <h1 className='text-[32px] font-light leading-tight'>
          Ya casi terminamos, ya casi podes <span className='font-semibold'>usar Buffet.</span>
        </h1>
        <p className='font-light text-zinc-700'>
          Creamos esta app para hacer <span className='font-semibold text-black'>tu vida mas facil.</span> Creado por
          alumnos de la UNAHUR, para alumnos de la UNAHUR.
        </p>
      </section>
      <Form />
    </main>
  )
}

export default OnboardingPage
