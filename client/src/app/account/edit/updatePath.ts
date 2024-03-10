'use server'
import { routes } from '@/utils/constants/routes.const'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export const updateRedirect = async () => {
  revalidateTag('profile')
  redirect(routes.customer.ACCOUNT)
}
