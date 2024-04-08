'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, TableCell, TableRow } from '@nextui-org/react'
import { DynamicTable, VerticalDotsIcon } from '@/components'
import { authorizeCash } from '@/services/api-client'
import { type Profile } from '@/interfaces'
import Image from 'next/image'

interface Props {
  users: Profile[] | undefined
}

interface DropItems {
  title: string
  action: () => void
  isVisible: boolean
}

const UsersTable = ({ users }: Props) => {
  const router = useRouter()

  const handleAuthorize = async (value: boolean, userId: string) => {
    try {
      const { data, error } = await authorizeCash({ is_authorized: value, userId })
      console.log(data)

      if (error) {
        console.log(error)
        return toast.error('Algo salió mal')
      }

      router.refresh()
      toast.success('Realizado')
    } catch (error) {
      console.error(error)
    }
  }

  const dropItems = (item: Profile): DropItems[] => [
    {
      title: 'Autorizar',
      action: async () => {
        await handleAuthorize(true, item?.id)
      },
      isVisible: !item?.cash_authorizations?.is_authorized ?? false
    },
    {
      title: 'Revocar autorizacion',
      action: async () => {
        await handleAuthorize(false, item?.id)
      },
      isVisible: item?.cash_authorizations?.is_authorized ?? false
    }
  ]

  return (
    <>
      <DynamicTable
        shadow='none'
        classNames={{
          wrapper: 'overflow-x-scroll'
        }}
        radius='md'
        className='w-full rounded-xl border'
        data={users ?? []}
        rowsPerPage={8}
        columns={['Nombre', 'DNI', 'Fecha de registro', 'Estado', 'Autorizador', 'Acciones']}
        selectionBehavior='toggle'
        renderRow={(item: Profile) => (
          <TableRow key={item?.id}>
            <TableCell className='flex items-center gap-2'>
              <Image
                alt='img'
                width={100}
                height={100}
                src={item?.profile_image}
                className='aspect-square h-[50px] w-[50px] rounded-lg object-cover'
              />
              <p className='font-light'>{item?.first_name + ' ' + item?.last_name}</p>
            </TableCell>
            <TableCell>
              <p className='font-semibold'>{item?.dni}</p>
            </TableCell>
            <TableCell>
              <p className='font-light'>{new Date(item?.created_at).toLocaleString()}</p>
            </TableCell>
            <TableCell>
              <p className='font-light'>{item?.cash_authorizations?.is_authorized ? 'Autorizado' : 'No autorizado'}</p>
            </TableCell>
            <TableCell>
              <p className='font-light'>
                {item?.cash_authorizations?.is_authorized
                  ? item?.cash_authorizations?.authorized_by?.first_name +
                    ' ' +
                    item?.cash_authorizations?.authorized_by?.last_name
                  : '-'}
              </p>
            </TableCell>
            <TableCell>
              <div className='relative flex items-center justify-end gap-2'>
                <Dropdown
                  classNames={{
                    content: '!min-w-[150px] '
                  }}
                >
                  <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='flat'>
                      <VerticalDotsIcon className='text-neutral-600' />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Action event example'>
                    {dropItems(item)
                      .filter((item) => item?.isVisible)
                      .map((item, index) => (
                        <DropdownItem key={index} onClick={item.action}>
                          {item?.title}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
            {/* <TableCell className='flex items-center gap-2 '>
              <p>{item.first_name + ' ' + item.last_name}</p>
            </TableCell>
            <TableCell className='flex  items-center gap-2 '>
              <p>{item.dni}</p>
            </TableCell>
            <TableCell className='flex justify-end gap-1'>

            </TableCell> */}
          </TableRow>
        )}
      />
    </>
  )
}

export default UsersTable
