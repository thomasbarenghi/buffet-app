const common = {
  SHOPS: '/shops',
  ACCOUNT: '/account',
  ORDER_HISTORY: '/account/order-history',
  ALL_PRODUCTS: '/shops/products'
}

export const routes = {
  auth: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  customer: {
    ...common,
    HOME: '/',
    CHECKOUT: '/checkout',
    ORDER_TRACKING: (id: string) => `/order-tracking/${id}`,
    SHOP: (id: string) => `/shops/${id}`
  },
  dealer: {
    ...common,
    HOME: '/dealer',
    AVAILABILITY: '/dealer/availability',
    WAITING_ORDER: '/dealer/waiting-order',
    ORDER: (id: string) => `/dealer/order/${id}`
  },
  shop: {
    ...common,
    HOME: '/merchants ',
    SHOP: (id: string) => `/shops/${id}`,
    ACTIVE_ORDERS: (id: string) => `/shops/${id}/active-orders`,
    CREATE_PRODUCT: (id: string) => `/shops/${id}/create-product`,
    ONBOARDING: '/merchants/onboarding'
  }
}
