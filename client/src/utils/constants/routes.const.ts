const commonRoutes = {
  ACCOUNT: '/account',
  EDIT_ACCOUNT: '/account/edit',
  ORDERS: '/account/orders'
}

export const routes = {
  common: commonRoutes,
  auth: {
    LOGIN: '/auth/login',
    CALLBACK: '/auth/callback',
    REGISTER: '/auth/register'
  },
  customer: {
    HOME: '/shop',
    CHECKOUT: '/shop/checkout',
    ORDER_TRACKING: (id: string) => `/order-tracking/${id}`,
    ONBOARDING: '/account/onboarding',
    ACTIVE_ORDERS: '/account/active-orders'
  },
  attendant: {
    HOME: '/management',
    PRODUCTS: '/management/products',
    CREATE_PRODUCT: '/management/products/create',
    EDIT_PRODUCT: (id: string) => `/management/products/edit/${id}`
  }
}
