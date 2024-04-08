import { type Metadata } from 'next'
import Form from './_components/Form'
import { findUserMetaData } from '@/utils/functions'

export const metadata: Metadata = {
  title: 'Editar cuenta | Buffet UNAHUR'
}

const EditAccountPage = async () => {
  const profile = await findUserMetaData()
  return (
    <main className='resp-pad-x flex flex-col items-center gap-4 bg-neutral-50 py-10 pb-12'>
      <section className='flex w-full max-w-md flex-col gap-4'>
        <h1 className='w-full text-2xl font-light leading-tight'>
          Editar <span className='font-semibold'>perfil.</span>
        </h1>
        <Form profile={profile} />
      </section>
    </main>
  )
}

export default EditAccountPage
