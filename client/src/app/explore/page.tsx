import { type Metadata } from 'next'
import Image from 'next/image'
import { sections, features } from './lib'
import { Button } from '@/components'
import { routes } from '@/utils/constants'

export const metadata: Metadata = {
  title: 'Tienda | Buffet UNAHUR'
}

const ShopPage = async () => (
  <main className='  flex flex-col items-center'>
    <section className='resp-pad-x flex w-full items-center justify-center gap-12 py-12 pb-14'>
      <div className=' flex w-full flex-col items-center justify-center gap-12 2xl:container'>
        <div className='flex w-full flex-col items-start gap-3 md:items-center '>
          <h1 className='w-full text-3xl font-light leading-[145%] md:text-center lg:text-4xl'>
            Simplificamos tu manera de <span className='font-semibold'>comer en la uni. 🚀</span>
          </h1>
          <p className='w-full font-light leading-[165%] text-black md:text-center lg:w-[650px] '>
            Con Buffet, <span className='font-semibold text-black'>¡decile chau a la fila! </span> Disfruta de la
            comodidad de pagar tu pedido online desde tu celular. Creado por alumnos de la UNAHUR ❤️.
          </p>
          <Button title='Explorar la tienda' className='mt-2' href={routes.customer.SHOP} />
        </div>
        <div className='flex w-full flex-row justify-between gap-5 overflow-y-auto md:gap-10 lg:grid lg:grid-cols-4 xl:w-[85%]'>
          {sections.map((section, index) => (
            <div
              key={index}
              className='relative flex aspect-square min-w-[250px] flex-col gap-4 md:min-w-[350px] lg:min-w-0'
            >
              <div className='relative aspect-square h-full w-full overflow-hidden rounded-full'>
                <Image src={section.imageSrc} alt='' fill className='object-cover' />
              </div>
              <p className='w-full text-center text-[18px] font-light'>
                {section.text} <span className='font-semibold'>{section.emphasis}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className='resp-pad-x flex w-full items-center justify-center gap-12 border-t bg-neutral-50 py-14'>
      <div className=' flex w-full flex-col items-center justify-center gap-12 2xl:container'>
        <div className='flex w-full flex-col items-center gap-2 '>
          <h1 className='text-center text-3xl font-light leading-tight'>
            Queremos que aproveches tu tiempo haciendo{' '}
            <span className='font-semibold'>las cosas que te gustan. ✨</span>
          </h1>
          <p className='text-center font-light leading-[165%] md:w-[85%] xl:w-[800px] '>
            Nuestra misión es <span className='font-semibold text-black'>simplificar tu experiencia</span> en el comedor
            para que puedas dedicar más tiempo a tus estudios, tus amigos o simplemente relajarte.
          </p>
        </div>
        <div className='grid justify-between gap-10 md:grid-cols-2 xl:w-[85%] xl:grid-cols-4'>
          {features.map((feature, index) => (
            <div key={index} className='flex flex-col gap-4'>
              <Image src={feature.icon} alt='' className='h-[60px] w-[60px] object-contain ' width={60} height={60} />
              <div className='flex flex-col gap-2'>
                <p className='text-xl font-semibold'>{feature.title}</p>
                <p className='font-light leading-[165%]'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </main>
)

export default ShopPage
