import { routes } from '@/utils/constants'
import { type Role } from '@/interfaces'

interface Menu {
  title: string
  href: string
}

export const menu: Record<Role, Menu[]> = {
  customer: [
    {
      title: 'Inicio',
      href: routes.customer.EXPLORE
    },
    {
      title: 'Tienda',
      href: routes.customer.SHOP
    },
    {
      title: 'Sobre nosotros',
      href: routes.attendant.CREATE_PRODUCT
    },
    {
      title: 'Atención al cliente',
      href: routes.attendant.CREATE_PRODUCT
    }
  ],
  attendant: [
    {
      title: 'Principal',
      href: routes.attendant.HOME
    },
    {
      title: 'Pedidos en efectivo',
      href: routes.attendant.AUTHORIZE_CASH
    },
    {
      title: 'Productos',
      href: routes.attendant.PRODUCTS
    },
    {
      title: 'Pedidos',
      href: routes.common.ORDERS
    }
  ],
  manager: [
    {
      title: 'Principal',
      href: routes.attendant.HOME
    },
    {
      title: 'Pedidos en efectivo',
      href: routes.attendant.AUTHORIZE_CASH
    },
    {
      title: 'Productos',
      href: routes.attendant.PRODUCTS
    },
    {
      title: 'Pedidos',
      href: routes.common.ORDERS
    }
  ],
  admin: [
    {
      title: 'Principal',
      href: routes.attendant.HOME
    },
    {
      title: 'Pedidos en efectivo',
      href: routes.attendant.AUTHORIZE_CASH
    },
    {
      title: 'Productos',
      href: routes.attendant.PRODUCTS
    },
    {
      title: 'Pedidos',
      href: routes.common.ORDERS
    }
  ]
}
