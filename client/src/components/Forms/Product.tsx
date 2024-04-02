'use client'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Input, Button, Textarea } from '@/components'
import { productValidations } from '@/utils/constants/validations.const'
import { type Product, type ProductFormData } from '@/interfaces'

interface Props {
  mode: 'create' | 'edit'
  handleSubmitForm: (data: ProductFormData) => Promise<unknown>
  product?: Product | undefined
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
            validations: productValidations.title
          }}
          errorMessage={errors?.title?.message}
          defaultValue={mode === 'create' ? '' : product?.title}
        />
        <Input
          type='number'
          label='Precio'
          placeholder='Ingrese el precio del producto'
          name='price'
          startContent={
            <div className='pointer-events-none flex items-center'>
              <span className='text-small text-default-400'>$</span>
            </div>
          }
          hookForm={{
            register,
            validations: productValidations.price
          }}
          errorMessage={errors?.price?.message}
          defaultValue={mode === 'create' ? '' : product?.price?.toString()}
        />
        {/* {product?.thumbnail && mode === 'edit' && (
          <Image
            src={product?.thumbnail}
            width={80}
            height={80}
            className='rounded-md border-2 object-cover'
            alt='img'
          />
        )} */}
        <Input
          type='file'
          label='Imagen de portada'
          placeholder={
            mode === 'create' ? 'Ingresa una imagen' : 'Solo ingresa una imagen si quieres cambiar la actual'
          }
          name='thumbnail'
          hookForm={{
            register
          }}
          errorMessage={errors?.thumbnail?.message}
        />
        <Textarea
          name='description'
          label='Descripcion'
          placeholder='Ingrese la descripcion del producto'
          errorMessage={errors.description?.message}
          hookForm={{
            register,
            validations: productValidations.description
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
