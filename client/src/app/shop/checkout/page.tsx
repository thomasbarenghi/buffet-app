import { type Metadata } from 'next'
import { getShopStatus } from '@/services/api-server'
import { cookies } from 'next/headers'
import dynamic from 'next/dynamic'
import { getAllProducts } from '@/services/api-client'
const ShopClose = dynamic(async () => await import('./_components/ShopClose'))
const CartEmpty = dynamic(async () => await import('./_components/CartEmpty'))
const Summary = dynamic(async () => await import('./_components/Summary'))

export const metadata: Metadata = {
  title: 'Carrito | Buffet UNAHUR'
}

const Checkout = async () => {
  const shop = await getShopStatus()
  const isOpen = shop?.data?.is_open ?? false
  const cookieStore = cookies()
  const cookie = cookieStore.get('cartItems')?.value ?? ''
  const products = await getAllProducts(cookie)
  const items = cookie?.length > 0 ? cookie?.split(',') : []

  return (
    <main className='flex flex-col items-center  pb-9'>
      {!isOpen ? (
        <ShopClose />
      ) : isOpen && items.length <= 0 ? (
        <CartEmpty />
      ) : (
        <Summary productsP={products?.data ?? []} />
      )}
    </main>
  )
}

export default Checkout
