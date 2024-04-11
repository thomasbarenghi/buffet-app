'use client'
import { ProductCardVert } from '@/components'
import { type RawUserMeta, type Product } from '@/interfaces'

interface Props {
  products: Product[] | undefined
  profile: RawUserMeta
}

const ProductCardGrid = ({ products, profile }: Props) => (
  <div className='grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
    {products?.map((product, index) => <ProductCardVert product={product} key={index} mode={profile?.role} />)}
  </div>
)

export default ProductCardGrid
