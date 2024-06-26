'use client'
import Image from 'next/image'
import { TableCell, TableRow } from '@nextui-org/react'
import { DynamicTable } from '@/components'
import { type OrderInterface, OrderStatusClientEnum } from '@/interfaces'

interface Props {
  orders: OrderInterface[] | undefined
}

const OrdersTable = ({ orders }: Props) => (
  <DynamicTable
    shadow='none'
    isStriped
    classNames={{
      wrapper: 'overflow-x-scroll'
    }}
    radius='md'
    className='w-full rounded-xl border'
    data={orders ?? []}
    rowsPerPage={8}
    columns={['Producto/s', 'Orden', 'Precio final', 'Estatus', 'Fecha']}
    selectionBehavior='toggle'
    renderRow={(order: OrderInterface) => (
      <TableRow key={order.id}>
        <TableCell className='grid min-w-[250px] gap-4'>
          {order?.products?.map((item) => (
            <div className='flex items-center gap-2 ' key={item?.product?.id}>
              <Image
                alt='img'
                width={100}
                height={100}
                priority
                quality={85}
                src={item?.product?.thumbnail}
                className='aspect-square h-[50px] w-[50px] rounded-lg object-cover'
              />
              <div>
                <p>{item?.product?.title}</p>
                <span className='text-xs font-light'>(${item?.product?.price})</span>
              </div>
            </div>
          ))}
        </TableCell>
        <TableCell className='text-sm font-light'>{'#' + order?.id.slice(0, 4)}</TableCell>
        <TableCell className=' text-sm font-light'>{'$' + order?.total_price}</TableCell>
        <TableCell className='text-sm font-light'>{OrderStatusClientEnum[order?.status]}</TableCell>
        <TableCell className='min-w-[150px] text-sm font-light '>
          {new Date(order.created_at).toLocaleString()}
        </TableCell>
      </TableRow>
    )}
  />
)

export default OrdersTable
