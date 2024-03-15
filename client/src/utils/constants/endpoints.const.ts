export const Endpoints = {
  LOGIN: '/api/auth/login',
  FIND_PRODUCTS: (apikey: string) => `/rest/v1/products?apikey=${apikey}`,
  FIND_PRODUCT: (id: string, apikey: string) => `/rest/v1/products?id=eq.${id}&apikey=${apikey}`,
  FIND_PROFILE: (id: string, apikey: string) => `/rest/v1/profiles?id=eq.${id}&apikey=${apikey}`,
  FIND_ORDER: (id: string, apikey: string) => `/rest/v1/orders?id=eq.${id}&apikey=${apikey}`,
  FIND_SHOP_ACTIVE_ORDERS: (apikey: string) =>
    `/rest/v1/orders?status=in.("PendingApproval","PendingPreparation","InProgress","PendingDelivery")&select=*,customer:profiles(*),products:orders_products(...products(*))&apikey=${apikey}`,
  FIND_USER_ACTIVE_ORDERS: (id: string, apikey: string) =>
    `/rest/v1/orders?customer_id=eq.${id}&status=in.("PendingApproval","PendingPreparation","InProgress","PendingDelivery")&select=*,customer:profiles(*),products:orders_products(...products(*))&apikey=${apikey}`
}
