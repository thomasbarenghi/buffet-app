'use server'
import { revalidatePath } from 'next/cache'
import { routes } from '@/utils/constants'

export const revalidateCartPage = () => {
  revalidatePath(routes.customer.CHECKOUT)
}
