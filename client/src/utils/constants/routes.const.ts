const commonRoutes = {
  ACCOUNT: '/account',
  EDIT_ACCOUNT: '/account/edit',
  ORDERS: '/orders'
}

export const routes = {
  common: commonRoutes,
  auth: {
    LOGIN: '/auth/login',
    CALLBACK: '/auth/callback',
    REGISTER: '/auth/register'
  },
  customer: {
    SHOP: '/shop',
    EXPLORE: '/explore',
    CHECKOUT: '/shop/checkout',
    ONBOARDING: '/account/onboarding'
  },
  attendant: {
    AUTHORIZE_CASH: '/management/authorize-cash',
    HOME: '/management',
    PRODUCTS: '/management/products',
    CREATE_PRODUCT: '/management/products/create',
    EDIT_PRODUCT: (id: string) => `/management/products/edit/${id}`
  }
}
