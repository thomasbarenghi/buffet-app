'use client'
import { ProductDynamicForm } from '@/components'
import { type ProductFormData } from '@/interfaces'
import { type FunctionComponent } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { routes } from '@/utils/constants/routes.const'
import { createProduct } from '@/services/products/create-product.service'

const Form: FunctionComponent = () => {
  const router = useRouter()

  const handleSubmitForm = async (formData: ProductFormData) => {
    try {
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
