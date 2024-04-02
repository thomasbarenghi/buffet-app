'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProductDynamicForm } from '@/components'
import { createProduct } from '@/services/api-client'
import { routes } from '@/utils/constants'
import { type ProductFormData } from '@/interfaces'

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
