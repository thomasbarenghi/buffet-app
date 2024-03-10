import { type Product } from '@/interfaces'
import { TableCell, TableRow } from '@nextui-org/react'
import { type FunctionComponent } from 'react'
import { DynamicTable } from '..'

interface Props {
  products: Product[]
}

const ProductsTable: FunctionComponent<Props> = ({ products }) => (
  <DynamicTable
    data={products}
    rowsPerPage={4}
    columns={['Cantidad', 'Producto', 'Precio final']}
    renderRow={(product: Product) => (
      <TableRow key={product.id}>
        <TableCell className='font-semibold'>1x</TableCell>
        <TableCell>
          <p>{product.title}</p>
          <span className='text-xs font-light'>(${product.price})</span>
        </TableCell>
        <TableCell className='text-base font-semibold'>${product.price}</TableCell>
      </TableRow>
    )}
  />
)

export default ProductsTable
