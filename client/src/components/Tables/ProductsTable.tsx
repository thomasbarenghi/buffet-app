'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  TableCell,
  TableRow,
  useDisclosure
} from '@nextui-org/react'
import { DynamicTable, ModalProduct, VerticalDotsIcon } from '@/components'
import { deleteProduct } from '@/services/api-client'
import { truncateText } from '@/utils/functions'
import { routes } from '@/utils/constants'
import { RoleEnum, type Product } from '@/interfaces'

interface Props {
  products: Product[] | undefined
}

const ProductsTable = ({ products }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [product, setProduct] = useState<Product>()
  const router = useRouter()

  const handleView = (item: Product) => {
    setProduct(item)
    onOpen()
  }

  const handleDelete = async (product: Product) => {
    try {
      const result = confirm(`¿Seguro que quieres eliminar ${product.title}?`)
      if (!result) return toast.warning('Operación cancelada')
      const { error } = await deleteProduct(product.id)
      if (error) return toast.error('Algo salió mal')
      toast.success('Eliminado correctamente')
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Ocurrió un error')
    }
  }

  return (
    <>
      <ModalProduct product={product} isOpen={isOpen} mode={RoleEnum.Attendant} onClose={onClose} />
      <DynamicTable
        shadow='none'
        classNames={{
          wrapper: 'overflow-x-scroll'
        }}
        pag
        radius='md'
        className='w-full rounded-xl border'
        data={products ?? []}
        rowsPerPage={8}
        columns={['Producto', 'Descripcion', 'Acciones']}
        selectionBehavior='toggle'
        renderRow={(product: Product) => (
          <TableRow key={product.id}>
            <TableCell className='flex min-w-[250px] items-center gap-2 '>
              <Image
                alt='img'
                width={100}
                height={100}
                src={product.thumbnail}
                className='aspect-square h-[50px] w-[50px] rounded-lg object-cover'
              />
              <div>
                <p>{product.title}</p>
                <span className='text-xs font-light'>(${product.price})</span>
              </div>
            </TableCell>
            <TableCell className='min-w-[250px] text-sm font-light'>{truncateText(product.description, 70)}</TableCell>
            <TableCell className='flex justify-end gap-1'>
              <div className='relative flex items-center justify-end gap-2'>
                <Dropdown
                  classNames={{
                    content: '!min-w-[150px] '
                  }}
                >
                  <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='flat'>
                      <VerticalDotsIcon className='text-neutral-600' />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      onClick={() => {
                        handleView(product)
                      }}
                    >
                      Ver
                    </DropdownItem>
                    <DropdownItem as={Link} href={routes.attendant.EDIT_PRODUCT(product.id)}>
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      color='danger'
                      className='text-danger'
                      variant='flat'
                      onClick={async () => {
                        await handleDelete(product)
                      }}
                    >
                      Eliminar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        )}
      />
    </>
  )
}

export default ProductsTable
