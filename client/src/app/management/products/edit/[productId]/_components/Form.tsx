'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProductDynamicForm } from '@/components'
import { patchProduct } from '@/services/api-client'
import { routes } from '@/utils/constants'
import { type Product, type ProductFormData } from '@/interfaces'

interface Props {
  orderId: string
  product: Product
}

const Form = ({ orderId, product }: Props) => {
  const router = useRouter()

  const handleSubmitForm = async (formData: ProductFormData) => {
    try {
      formData.thumbnail = formData.thumbnail instanceof FileList ? formData.thumbnail[0] : undefined

      const { error } = await patchProduct(formData, orderId)

      if (error) {
        console.error(error)
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
