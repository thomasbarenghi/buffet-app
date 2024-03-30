import Image from 'next/image'

const tips = [
  {
    title: 'Tiempos de entrega',
    body: 'Te recomendamos mantener un ojo en nuestra aplicación. Aquí encontrarás actualizaciones en tiempo real sobre el estado de tu compra, asegurándote una experiencia de entrega transparente y eficiente.',
    icon: '/icons/clock-orange.svg'
  },
  {
    title: 'Devoluciones',
    body: 'Una vez que el producto ha sido preparado o ha comenzado a prepararse, no podemos procesar devoluciones de dinero. Te recomendamos revisar cuidadosamente tu pedido antes de confirmarlo para evitar cualquier inconveniente.',
    icon: '/icons/arrow-left-orange.svg'
  },
  {
    title: 'Pago en efectivo',
    body: 'Ofrecemos la opción de pago en efectivo para aquellos usuarios que hayan confirmado su identidad físicamente con nosotros. Esta medida garantiza la seguridad de todas las transacciones en efectivo.',
    icon: '/icons/portrait-orange.svg'
  }
]

const Info = () => (
  <section className='resp-pad-x flex w-full justify-center border-t bg-white pt-8 '>
    <div className='flex w-full flex-col items-start justify-start gap-8 2xl:container'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-light'>
          Antes de <span className='font-semibold'>realizar tu compra</span>
        </h1>
        <p className='font-light text-zinc-700'>Tenes que tener en cuenta estos datos</p>
      </div>
      <div className='grid gap-5 lg:grid-cols-3'>
        {tips.map((item, index) => (
          <div key={index} className='flex w-full flex-col gap-2'>
            <Image width={30} height={30} alt='clock' src={item.icon} />
            <div className='flex w-full flex-col gap-1'>
              <h1 className='text-xl font-medium'>{item.title}</h1>
              <p className='font-light text-zinc-700'>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Info
