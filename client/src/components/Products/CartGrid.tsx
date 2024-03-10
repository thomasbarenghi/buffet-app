import { type FunctionComponent } from 'react'
import { type Product } from '@/interfaces'
import { ProductCartItem } from '..'

interface Props {
  products: Product[]
}

const ProductCartGrid: FunctionComponent<Props> = ({ products }) => (
  <div className='grid w-full'>
    {products.map((product, index) => (
      <ProductCartItem key={product.id} product={product} isLast={products.length - 1 === index} />
    ))}
  </div>
)

export default ProductCartGrid
