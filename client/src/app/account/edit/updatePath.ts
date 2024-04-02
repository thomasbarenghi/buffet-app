'use server'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { routes } from '@/utils/constants'

export const updateRedirect = async () => {
  revalidateTag('profile')
  redirect(routes.common.ACCOUNT)
}
