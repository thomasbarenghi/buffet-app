import { shopId } from './env.const'

export const Endpoints = {
  LOGIN: '/api/auth/login',
  FIND_CART_PRODUCTS: (ids: string, apikey: string) => `/rest/v1/products?id=in.${ids}&apikey=${apikey}`,
  FIND_PRODUCTS: (apikey: string) => `/rest/v1/products?apikey=${apikey}`,
  FIND_PRODUCT: (id: string, apikey: string) => `/rest/v1/products?id=eq.${id}&apikey=${apikey}`,
  FIND_PROFILE: (id: string, apikey: string) => `/rest/v1/profiles?id=eq.${id}&apikey=${apikey}`,
  FIND_ORDER: (id: string, apikey: string) => `/rest/v1/orders?id=eq.${id}&apikey=${apikey}`,
  FIND_SHOP_STATUS: (apikey: string) => `/rest/v1/shop_config?id=eq.${shopId}&apikey=${apikey}`,
  FIND_ORDER_MESSAGES: (orderId: string, apikey: string) =>
    `/rest/v1/messages?order_id=eq.${orderId}&select=*,user:profiles(*)&apikey=${apikey}`,
  FIND_SHOP_ACTIVE_ORDERS: (apikey: string) =>
    `/rest/v1/orders?status=in.("PendingApproval","PendingPreparation","InProgress","PendingDelivery")&select=*,customer:profiles(*),products:orders_products(...products(*))&apikey=${apikey}`,
  FIND_USER_ACTIVE_ORDERS: (id: string, apikey: string) =>
    `/rest/v1/orders?customer_id=eq.${id}&status=in.("PendingApproval","PendingPreparation","InProgress","PendingDelivery")&select=*,customer:profiles(*),products:orders_products(...products(*))&apikey=${apikey}`,
  FIND_USER_FINISHED_ORDERS: (id: string, apikey: string) =>
    `/rest/v1/orders?customer_id=eq.${id}&status=in.("Delivered","Canceled")&select=*,customer:profiles(*),products:orders_products(...products(*))&apikey=${apikey}`
}
