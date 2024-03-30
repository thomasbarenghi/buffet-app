import { type Metadata } from 'next'
import { getShopStatus } from '@/services/shop/get-shop-status.service'
import { cookies } from 'next/headers'
import { getAllItems } from '@/services/cart/get-items.service'
import dynamic from 'next/dynamic'
const ShopClose = dynamic(async () => await import('./_components/ShopClose'))
const CartEmpty = dynamic(async () => await import('./_components/CartEmpty'))
const Summary = dynamic(async () => await import('./_components/Summary'))

export const metadata: Metadata = {
  title: 'Carrito | Buffet UNAHUR'
}

const Checkout = async () => {
  const shop = await getShopStatus()
  const isOpen = shop?.data?.is_open ?? false
  console.log(shop)
  const cookieStore = cookies()
  const cookie = cookieStore.get('cartItems')?.value ?? ''
  const items = cookie?.length > 0 ? cookie?.split(',') : []
  const products = await getAllItems(items)

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
