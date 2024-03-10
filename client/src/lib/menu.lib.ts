import { routes } from '@/utils/constants/routes.const'

interface GeneralMenu {
  title: string
  href: string
}

export const generalMenu: GeneralMenu[] = [
  {
    title: 'Tienda',
    href: routes.customer.HOME
  },
  {
    title: 'Carrito',
    href: routes.customer.CHECKOUT
  },
  {
    title: 'Cuenta',
    href: routes.customer.ACCOUNT
  },
  {
    title: 'Pedidos en curso',
    href: routes.customer.ACTIVE_ORDERS
  }
]
