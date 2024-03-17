import { Button } from '@/components'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    orderId: string
  }
}

const Edit: FunctionComponent<Props> = async ({ params }) => (
  <>
    <section className='flex w-full flex-col gap-4'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[24px] font-medium leading-tight'>Editar producto</h1>
        <Button title='Guardar' />
      </div>
    </section>
  </>
)

export default Edit
