'use client'
import { ProductDynamicForm } from '@/components'
import { type Product, type ProductFormData } from '@/interfaces'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import { patchProduct } from '@/services/api-client'

interface Props {
  orderId: string
  product: Product
}

const Form = ({ orderId, product }: Props) => {
  const router = useRouter()

  const handleSubmitForm = async (formData: ProductFormData) => {
    try {
      const { error } = await patchProduct(formData, orderId)

      if (error) {
        console.log(error)
        return toast.error('Ocurrió un error')
      }

      router.push(routes.attendant.PRODUCTS)
      router.refresh()
      toast.success('Editado con exito')
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return <ProductDynamicForm mode='edit' product={product} handleSubmitForm={handleSubmitForm} />
}

export default Form
