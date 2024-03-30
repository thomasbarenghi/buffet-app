'use server'
import { ProductCardVert } from '@/components'
import { getProducts } from '@/services/products/get-products.service'
import { getProfile } from '@/services/user/get-profile.service'

const ProductCardGrid = async () => {
  const products = await getProducts()
  const profile = await getProfile()
  return (
    <div className='grid w-full grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {products?.data?.map((product, index) => (
        <ProductCardVert product={product} key={index} mode={profile.data?.role ?? 'customer'} />
      ))}
    </div>
  )
}

export default ProductCardGrid
