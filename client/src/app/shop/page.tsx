import { Footer, Header, ProductCardGrid } from '@/components'
import { getProducts } from '@/services/products/get-products.service'

const TitleHr = ({ text }: { text: string }) => (
  <div className='max-w-max'>
    <h1 className='text-[24px] font-medium leading-tight'>{text}</h1>
    <hr className=' w-[40%] border-[#FFBE0B] ' />
  </div>
)

const ShopPage = async () => {
  const products = await getProducts()
  return (
    <>
      <Header />
      <main className='resp-pad-x flex min-h-screen  flex-col items-center gap-9 py-4'>
        <section className='flex w-full flex-col gap-2 2xl:container'>
          <h1 className='text-[32px] font-light leading-tight'>
            Simplificamos tu manera de <span className='font-semibold'>comer en la uni.</span>
          </h1>
          <p className='font-light text-zinc-700'>
            Con Buffet, <span className='font-semibold text-black'>¡decile chau a la fila! </span> Disfruta de la
            comodidad de pagar tu pedido online desde tu celular. Creado por alumnos de la UNAHUR.
          </p>
        </section>
        <section className='flex w-full flex-col gap-6 2xl:container'>
          <TitleHr text='Todo nuestro menú' />
          <ProductCardGrid products={products.data ?? []} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ShopPage
