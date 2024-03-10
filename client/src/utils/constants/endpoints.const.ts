export const Endpoints = {
  LOGIN: '/api/auth/login',
  FIND_PRODUCTS: (apikey: string) => `/rest/v1/products?apikey=${apikey}`,
  FIND_PRODUCT: (id: string, apikey: string) => `/rest/v1/products?id=eq.${id}&apikey=${apikey}`
}
