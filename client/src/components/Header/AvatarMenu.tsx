'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { routes } from '@/utils/constants'
import { type RawUserMeta } from '@/interfaces'

interface Props {
  profile: RawUserMeta
}

const AvatarMenu = ({ profile }: Props) => {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSingOut = async () => {
    await supabase.auth.signOut()
    router.push(routes.auth.LOGIN)
  }

  return (
    <Dropdown
      classNames={{
        content: '!min-w-[170px] '
      }}
    >
      <DropdownTrigger>
        <Avatar isBordered radius='lg' src={profile?.profile_image} />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key='account' as={Link} href={routes.common.ACCOUNT}>
          Cuenta
        </DropdownItem>
        <DropdownItem key='edit-account' as={Link} href={routes.common.EDIT_ACCOUNT}>
          Editar perfil
        </DropdownItem>
        <DropdownItem key='orders' as={Link} href={routes.common.ORDERS}>
          Pedidos finalizados
        </DropdownItem>
        <DropdownItem key='logout' onClick={handleSingOut} className='text-danger' variant='flat' color='danger'>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default AvatarMenu
