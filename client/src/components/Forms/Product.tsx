'use client'
import { Input, Button, Textarea } from '@/components'
import { type Product, type ProductFormData } from '@/interfaces'
import { required } from '@/utils/constants/validations.const'
import { type SubmitHandler, useForm } from 'react-hook-form'

interface Props {
  mode: 'create' | 'edit'
  handleSubmitForm: (data: ProductFormData) => Promise<unknown>
  product?: Product
}

const ProductDynamicForm = ({ mode, handleSubmitForm, product }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<ProductFormData>({
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<ProductFormData> = async (formData) => {
    await handleSubmitForm(formData)
  }

  return (
    <div className='flex w-full flex-col gap-2 2xl:container'>
      <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          label='Titulo'
          placeholder='Ingrese el titulo del producto'
          name='title'
          hookForm={{
            register,
            validations: { required }
          }}
          errorMessage={errors?.title?.message}
          defaultValue={mode === 'create' ? '' : product?.title}
        />
        <Input
          type='number'
          label='Precio'
          placeholder='Ingrese el precio del producto'
          name='price'
          hookForm={{
            register,
            validations: { required }
          }}
          errorMessage={errors?.price?.message}
          defaultValue={mode === 'create' ? '' : product?.price?.toString()}
        />
        <Textarea
          name='description'
          label='Descripcion'
          placeholder='Ingrese la descripcion del producto'
          errorMessage={errors.description?.message}
          hookForm={{
            register,
            validations: { required }
          }}
          defaultValue={mode === 'create' ? '' : product?.description}
        />
        <Button
          type='submit'
          isLoading={isSubmitting}
          size='lg'
          color='primary'
          radius='lg'
          title={mode === 'create' ? 'Guardar' : 'Editar producto'}
        />
      </form>
    </div>
  )
}

export default ProductDynamicForm
