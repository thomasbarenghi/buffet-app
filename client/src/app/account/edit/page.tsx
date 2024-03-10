import { Footer, Header } from '@/components'
import Form from './_components/Form'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { getProfile } from '@/services/user/get-profile.service'

const EditAccountPage = async () => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')
  if (!profile.data) return
  return (
    <>
      <Header />
      <main className='resp-pad-x flex  flex-col gap-4 pb-[80px] pt-4'>
        <h1 className='text-[24px] font-light leading-tight'>
          Editar <span className='font-semibold'>perfil.</span>
        </h1>
        <Form user={user} profile={profile.data} />
      </main>
      <Footer />
    </>
  )
}

export default EditAccountPage
