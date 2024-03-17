import { Button } from '@/components'

const Create = () => (
  <>
    <section className='flex w-full flex-col gap-4'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[24px] font-medium leading-tight'>Nuevo Producto</h1>
        <Button title='Guardar' />
      </div>
    </section>
  </>
)

export default Create
