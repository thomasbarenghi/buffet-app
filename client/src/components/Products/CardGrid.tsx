import { type Role, type Product } from '@/interfaces'
import { ProductCardVert } from '@/components'

interface Props {
  products: Product[]
  mode: Role
}

const ProductCardGrid = ({ products, mode }: Props) => (
  <div className='grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
    {products.map((product, index) => (
      <ProductCardVert product={product} key={index} mode={mode} />
    ))}
  </div>
)

export default ProductCardGrid
