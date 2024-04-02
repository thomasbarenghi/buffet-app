'use server'
import { ProductCardVert } from '@/components'
import { getAllProducts } from '@/services/api-server'
import { findUserMetaData } from '@/utils/functions'

const ProductCardGrid = async () => {
  const [products, profile] = await Promise.all([getAllProducts(), findUserMetaData()])
  return (
    <div className='grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {products?.data?.map((product, index) => <ProductCardVert product={product} key={index} mode={profile?.role} />)}
    </div>
  )
}

export default ProductCardGrid
