import { type Metadata } from 'next'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { findCashAuthorization, getAllProducts, getShopStatus } from '@/services/api-server'
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
  const cartItemsStr = cookieStore.get('cartItems')
  const arrIds = cartItemsStr?.value.split(',') ?? []
  const cartItems = await getAllProducts(arrIds)
  const cashAuthorization = await findCashAuthorization()
  const isCashAuthorized = cashAuthorization.data?.is_authorized ?? false
  return (
    <main className='flex flex-col items-center  pb-9'>
      {!isOpen ? (
        <ShopClose />
      ) : isOpen && arrIds?.length > 0 && cartItems.data && cartItems?.data?.length <= 0 ? (
        <CartEmpty />
      ) : (
        <Summary productsP={cartItems?.data ?? []} isCashAuthorized={isCashAuthorized} />
      )}
    </main>
  )
}

export default Checkout
