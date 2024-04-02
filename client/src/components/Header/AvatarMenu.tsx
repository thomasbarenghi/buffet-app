'use client'
import { type RawUserMeta } from '@/interfaces'
import { routes } from '@/utils/constants/routes.const'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  console.log(profile)

  return (
    <Dropdown
      classNames={{
        content: '!min-w-[150px] '
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
          Ordenes
        </DropdownItem>
        <DropdownItem key='logout' onClick={handleSingOut} className='text-danger' variant='flat' color='danger'>
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default AvatarMenu
