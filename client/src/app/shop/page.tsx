import { type Metadata } from 'next'
import Content from './_components/Content'
import { getAllProducts } from '@/services/api-server'
import { getAllCategories } from '@/services/api-server/product.service'
import { findUserMetaData } from '@/utils/functions'

export const metadata: Metadata = {
  title: 'Tienda | Buffet UNAHUR'
}

const ShopPage = async () => {
  const [products, profile, categories] = await Promise.all([
    getAllProducts({}),
    findUserMetaData(),
    getAllCategories()
  ])
  return (
    <main className='flex flex-col items-center justify-center gap-9 pb-14'>
      <Content productFallback={products.data ?? []} categories={categories.data ?? []} profile={profile} />
    </main>
  )
}

export default ShopPage
