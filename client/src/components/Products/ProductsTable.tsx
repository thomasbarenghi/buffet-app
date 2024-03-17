'use client'
import { type Product } from '@/interfaces'
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
import { type SVGProps, useState, type FunctionComponent } from 'react'
import { DynamicTable, ModalProduct } from '..'
import { truncateText } from '@/utils/functions/truncateText'
import { routes } from '@/utils/constants/routes.const'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  products: Product[]
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

const VerticalDotsIcon = ({ size = 24, width, height, ...props }: IconSvgProps) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height={size || height}
    role='presentation'
    viewBox='0 0 24 24'
    width={size || width}
    {...props}
  >
    <path
      d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
      fill='currentColor'
    />
  </svg>
)

const ProductsTable: FunctionComponent<Props> = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [product, setProduct] = useState<Product>()

  const handleView = (item: Product) => {
    setProduct(item)
    onOpen()
  }

  return (
    <>
      <ModalProduct product={product!} isOpen={isOpen} onClose={onClose} />
      <DynamicTable
        shadow='none'
        radius='md'
        className='w-full rounded-xl border'
        data={products}
        rowsPerPage={5}
        columns={['Producto', 'Descripcion', 'Acciones']}
        selectionBehavior='toggle'
        // onRowAction={(key) => {
        //   alert(`Opening item ${key}...`)
        // }}
        renderRow={(product: Product) => (
          <TableRow key={product.id}>
            <TableCell className='flex items-center gap-2'>
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
            <TableCell className='text-sm font-light'>{truncateText(product.description, 70)}</TableCell>
            <TableCell className='flex justify-end gap-1'>
              <div className='relative flex items-center justify-end gap-2'>
                <Dropdown>
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
                    <DropdownItem color='danger' className='text-danger' variant='flat'>
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
