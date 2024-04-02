import { type Metadata } from 'next'
import Form from './_components/Form'

export const metadata: Metadata = {
  title: 'Crear un producto | Administracion | Buffet UNAHUR'
}

const Create = () => (
  <section className='flex w-full max-w-md flex-col gap-4'>
    <h1 className='w-full text-2xl font-light leading-tight'>
      Crear nuevo <span className='font-semibold'>producto.</span>
    </h1>
    <Form />
  </section>
)

export default Create
