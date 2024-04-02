'use client'
import { ProductDynamicForm } from '@/components'
import { type ProductFormData } from '@/interfaces'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants'
import { createProduct } from '@/services/api-client'

const Form = () => {
  const router = useRouter()

  const handleSubmitForm = async (formData: ProductFormData) => {
    try {
      formData.thumbnail = formData.thumbnail instanceof FileList ? formData.thumbnail[0] : undefined

      const { error } = await createProduct(formData)

      if (error) {
        return toast.error('Ocurrió un error')
      }

      router.push(routes.attendant.PRODUCTS)
      router.refresh()
      toast.success('Creado con exito')
    } catch (error) {
      toast.error('Ocurrió un error')
      console.error(error)
    }
  }

  return <ProductDynamicForm mode='create' handleSubmitForm={handleSubmitForm} />
}

export default Form
