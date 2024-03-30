import Form from './_components/Form'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getProfile } from '@/services/user/get-profile.service'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar cuenta | Buffet UNAHUR'
}

const EditAccountPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')
  if (!profile.data) return
  return (
    <main className='resp-pad-x flex flex-col items-center gap-4 bg-neutral-50 pb-9 pt-8'>
      <section className='flex w-full max-w-md flex-col gap-4'>
        <h1 className='w-full text-2xl font-light leading-tight'>
          Editar <span className='font-semibold'>perfil.</span>
        </h1>
        <Form user={user} profile={profile.data} />
      </section>
    </main>
  )
}

export default EditAccountPage
