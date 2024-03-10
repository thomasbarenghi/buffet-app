import { type Product } from '@/interfaces'
import { ProductCardVert } from '@/components'

interface Props {
  products: Product[]
}

const ProductCardGrid = ({ products }: Props) => (
  <div className='grid w-full grid-cols-2 gap-5 sm:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]'>
    {products.map((product, index) => (
      <ProductCardVert product={product} key={index} />
    ))}
  </div>
)

export default ProductCardGrid
