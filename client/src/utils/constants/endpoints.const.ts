export const endpoints = {
  products: {
    FIND_ALL: (idsQuery?: string) => `/api/products${idsQuery && `/?ids=${idsQuery}`}`,
    FIND_ONE: (id: string) => '/api/products/' + id,
    CREATE_ONE: '/api/products',
    PATCH_ONE: (id: string) => '/api/products/' + id,
    DELETE_ONE: (id: string) => '/api/products/' + id
  },
  orders: {
    CREATE_ONE: '/api/orders',
    CHANGE_STATUS: (id: string) => '/api/orders/' + id,
    CHECKOUT: '/api/checkout'
  },
  shops: {
    CHANGE_STATUS: '/api/shops',
    ACTIVE_ORDERS: '/api/shops/active-orders'
  },
  users: {
    AUTHORIZE_CASH: '/api/users/authorize-cash',
    FIND_PROFILE: (id: string) => '/api/users/' + id,
    CREATE_PROFILE: '/api/users',
    PATCH_PROFILE: (id: string) => '/api/users/' + id,
    ACTIVE_ORDERS: (id: string) => '/api/users/' + id + '/active-orders'
  },
  messages: {
    CREATE_ONE: '/api/messages',
    FIND_ORDER_MESSAGES: (orderId: string) => '/api/messages?orderId=' + orderId
  }
}
