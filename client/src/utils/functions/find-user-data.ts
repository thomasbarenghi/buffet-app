import { RoleEnum, type RawUserMeta } from '@/interfaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const findUserMetaData = async (): Promise<RawUserMeta> => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
  const user = (await supabase.auth.getUser()).data.user
  const meta = user?.user_metadata
  return {
    role: meta?.role ?? RoleEnum.Customer,
    full_name: meta?.full_name ?? 'Algo salió mal',
    first_name: meta?.first_name ?? 'Algo salió mal',
    last_name: meta?.last_name ?? 'Algo salió mal',
    dni: meta?.dni ?? '00000000',
    profile_image: meta?.profile_image,
    id: user?.id ?? 'error'
  }
}
