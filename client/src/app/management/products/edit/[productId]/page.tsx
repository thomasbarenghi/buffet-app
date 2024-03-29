import Form from './_components/Form'
import { getProduct } from '@/services/products/get-product.service'

interface Props {
  params: {
    productId: string
  }
}

const Edit = async ({ params }: Props) => {
  const product = await getProduct(params.productId)
  return (
    <section className='flex w-full max-w-md flex-col gap-4'>
      <h1 className='w-full text-2xl font-light leading-tight'>
        Editar un <span className='font-semibold'>producto.</span>
      </h1>
      <Form orderId={params.productId} product={product.data!} />
    </section>
  )
}

export default Edit
