'use server'
import { ProductCardVert } from '@/components'
import { getAllProducts, getUserProfile } from '@/services/api-server'

const ProductCardGrid = async () => {
  const products = await getAllProducts()
  const profile = await getUserProfile()
  return (
    <div className='grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {products?.data?.map((product, index) => (
        <ProductCardVert product={product} key={index} mode={profile.data?.role ?? 'customer'} />
      ))}
    </div>
  )
}

export default ProductCardGrid
