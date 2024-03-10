import { type Product } from '@/interfaces'
import { ProductCardVert } from '@/components'

interface Props {
  products: Product[]
}

const ProductCardGrid = ({ products }: Props) => (
  <div className='grid w-full grid-cols-2 gap-5'>
    {products.map((product, index) => (
      <ProductCardVert product={product} key={index} />
    ))}
  </div>
)

export default ProductCardGrid
