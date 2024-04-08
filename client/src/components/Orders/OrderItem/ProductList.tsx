import { type OrderInterface } from '@/interfaces'
import Image from 'next/image'

const ProductList = ({ order }: { order: OrderInterface | undefined }) => (
  <div className='grid w-full'>
    {order?.products?.map((item, index) => (
      <div
        className={`flex w-full flex-row items-center gap-2 pt-3 ${order?.products && order?.products?.length - 1 !== index && 'border-b pb-3'}`}
        key={item?.product?.id}
      >
        <div className='relative aspect-square h-auto w-full max-w-[50px]'>
          <Image
            src={item?.product?.thumbnail}
            alt='picture'
            priority
            quality={85}
            fill
            className='rounded-xl object-cover'
          />
        </div>
        <div className='flex w-full flex-col gap-[2px] '>
          <h1 className='text-sm font-normal'>
            x{item?.quantity} {item?.product?.title}
          </h1>
          <p className='text-xs font-semibold'>${item?.product?.price} C/U</p>
        </div>
      </div>
    ))}
  </div>
)

export default ProductList
