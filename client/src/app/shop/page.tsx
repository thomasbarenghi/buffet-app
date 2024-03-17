import { Footer, Header, ProductCardGrid } from '@/components'
import { RoleEnum } from '@/interfaces'
import { getProducts } from '@/services/products/get-products.service'
import { getProfile } from '@/services/user/get-profile.service'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const TitleHr = ({ text }: { text: string }) => (
  <div className='max-w-max'>
    <h1 className='text-2xl font-medium leading-tight'>{text}</h1>
    <hr className=' w-[40%] border-[#FFBE0B] ' />
  </div>
)

const ShopPage = async () => {
  const products = await getProducts()
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = await supabase.auth.getUser()
  const profile = await getProfile(user.data.user?.id ?? '')
  return (
    <>
      <Header withBorder />
      <main className='resp-pad-x flex flex-col items-center gap-9 pb-14 pt-8'>
        <section className='flex w-full flex-col gap-2 2xl:container'>
          <h1 className='text-3xl font-light leading-tight'>
            Simplificamos tu manera de <span className='font-semibold'>comer en la uni.</span>
          </h1>
          <p className='font-light text-zinc-700'>
            Con Buffet, <span className='font-semibold text-black'>¡decile chau a la fila! </span> Disfruta de la
            comodidad de pagar tu pedido online desde tu celular. Creado por alumnos de la UNAHUR.
          </p>
        </section>
        <section className='flex w-full flex-col gap-6 2xl:container'>
          <TitleHr text='Todo nuestro menú' />
          <ProductCardGrid products={products.data ?? []} mode={profile.data?.role ?? RoleEnum.Customer} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ShopPage
