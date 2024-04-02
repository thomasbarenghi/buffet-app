import { type Role } from '@/interfaces'
import { routes } from '@/utils/constants'

interface Menu {
  title: string
  href: string
}

export const menu: Record<Role, Menu[]> = {
  customer: [
    {
      title: 'Tienda',
      href: routes.customer.HOME
    },
    {
      title: 'Pedidos en curso',
      href: routes.customer.ACTIVE_ORDERS
    }
  ],
  attendant: [
    {
      title: 'Principal',
      href: routes.attendant.HOME
    },
    {
      title: 'Productos',
      href: routes.attendant.PRODUCTS
    },
    {
      title: 'Ordenes',
      href: routes.common.ORDERS
    }
  ],
  manager: [],
  admin: []
}
