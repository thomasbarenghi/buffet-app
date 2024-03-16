import { type FunctionComponent } from 'react'
import { type Product } from '@/interfaces'
import { ProductCartItem } from '..'

interface Props {
  products: Product[]
  withBg?: boolean
}

const ProductCartGrid: FunctionComponent<Props> = ({ products, withBg }) => (
  <div className={`grid w-full ${withBg && 'gap-4'}`}>
    {products.map((product, index) => (
      <ProductCartItem key={product.id} product={product} isLast={products.length - 1 === index} withBg={withBg} />
    ))}
  </div>
)

export default ProductCartGrid
