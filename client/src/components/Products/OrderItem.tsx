'use client'
import { type OrderInterface } from '@/interfaces'
import Image from 'next/image'
import { truncateText } from '@/utils/functions/truncateText'

interface Props {
  order: OrderInterface
}

const ProductOrderItem = ({ order }: Props) => (
  <>
    <div className='flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4'>
      <div className='flex flex-col gap-1'>
        <div className='flex w-full items-center justify-between'>
          <p className=' font-semibold '>
            Orden #{order.id.slice(0, 4)} <span className='text-[#FB5607] '>Finalizada</span>
          </p>
          <p className='text-xs font-semibold'>${order.total_price}</p>
        </div>
        <p className='text-xs font-light'>Realizada el 25/02/2023</p>
      </div>
      <div className='flex w-full flex-row gap-3'>
        <div className='relative aspect-square h-auto w-full max-w-[90px]'>
          <Image src={order.products[0].thumbnail} alt='picture' fill className='rounded-2xl object-cover' />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <h1 className='font-normal'>{order.products[0].title}</h1>
            <p className='text-xs font-light text-zinc-700'>{truncateText(order.products[0].description, 70)}</p>
          </div>
          <p className='text-small font-semibold'>${order.products[0].price}</p>
        </div>
      </div>
    </div>
  </>
)
export default ProductOrderItem
