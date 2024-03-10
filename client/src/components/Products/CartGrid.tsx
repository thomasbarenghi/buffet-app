import { type FunctionComponent } from 'react'
import { type Product } from '@/interfaces'
import { ProductCartItem } from '..'

interface Props {
  products: Product[]
}

const ProductCartGrid: FunctionComponent<Props> = ({ products }) => (
  <div className='grid w-full'>
    {products.map((product) => (
      <ProductCartItem key={product.id} product={product} />
    ))}
  </div>
)

export default ProductCartGrid
