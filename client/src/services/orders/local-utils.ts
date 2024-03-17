import { OrderStatusApiEnum } from '@/interfaces'

export const productsCustomerTemplate = `
*,
customer: profiles ( * ),
products: orders_products ( ...products (*) )
`
export const statusActive = [
  OrderStatusApiEnum.InProgress,
  OrderStatusApiEnum.PendingApproval,
  OrderStatusApiEnum.PendingDelivery,
  OrderStatusApiEnum.PendingPreparation
]

export const statusFinished = [OrderStatusApiEnum.Delivered, OrderStatusApiEnum.Canceled]
