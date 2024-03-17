import { OrderStatusApiEnum } from '@/interfaces'

export const getNextOrderStatus = (currentStatus: OrderStatusApiEnum): OrderStatusApiEnum | undefined => {
  switch (currentStatus) {
    case OrderStatusApiEnum.PendingApproval:
      return OrderStatusApiEnum.PendingPreparation
    case OrderStatusApiEnum.PendingPreparation:
      return OrderStatusApiEnum.InProgress
    case OrderStatusApiEnum.InProgress:
      return OrderStatusApiEnum.PendingDelivery
    case OrderStatusApiEnum.PendingDelivery:
      return OrderStatusApiEnum.Delivered
    default:
      return currentStatus
  }
}

export const getPreviousOrderStatus = (currentStatus: OrderStatusApiEnum): OrderStatusApiEnum | undefined => {
  switch (currentStatus) {
    case OrderStatusApiEnum.PendingPreparation:
      return OrderStatusApiEnum.PendingApproval
    case OrderStatusApiEnum.InProgress:
      return OrderStatusApiEnum.PendingPreparation
    case OrderStatusApiEnum.PendingDelivery:
      return OrderStatusApiEnum.InProgress
    case OrderStatusApiEnum.Delivered:
      return OrderStatusApiEnum.PendingDelivery
    default:
      return currentStatus // No valid previous status for PendingApproval or Canceled
  }
}
