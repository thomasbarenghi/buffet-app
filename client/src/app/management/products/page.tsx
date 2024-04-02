import { type Metadata } from 'next'
import { Button, ProductsTable } from '@/components'
import { getAllProducts } from '@/services/api-server'
import { routes } from '@/utils/constants'

export const metadata: Metadata = {
  title: 'Productos | Administracion | Buffet UNAHUR'
}

const Products = async () => {
  const products = await getAllProducts()
  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-2xl font-medium leading-tight'>Productos</h1>
        <Button title='Crear' href={routes.attendant.CREATE_PRODUCT} />
      </div>
      <ProductsTable products={products.data ?? []} />
    </section>
  )
}

export default Products
