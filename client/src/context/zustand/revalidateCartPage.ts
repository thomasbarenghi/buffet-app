'use server'
import { routes } from '@/utils/constants/routes.const'
import { revalidatePath } from 'next/cache'

export const revalidateCartPage = () => {
  revalidatePath(routes.customer.CHECKOUT)
}
