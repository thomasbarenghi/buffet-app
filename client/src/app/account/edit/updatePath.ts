'use server'
import { routes } from '@/utils/constants'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateRedirect = async () => {
  revalidateTag('profile')
  redirect(routes.common.ACCOUNT)
}
