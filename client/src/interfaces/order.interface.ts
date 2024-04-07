// import { type User, type Chat, type Coordinates, type Product, type Shop } from '.'

import { type Product } from './product.interface'
import { type Profile } from './user.interface'

export type PaymentStatus = 'Pending' | 'Completed' | 'Failure'

export interface OrderInterface {
  id: string
  created_at: string
  payment_status: PaymentStatus
  total_price: number
  status: OrderStatusType
  customer_id: string | null
  products?: Product[]
  customer?: Profile
  code: number
  payment_link: string
  instructions: string | null
}

export type OrderStatusType =
  | 'PendingPayment'
  | 'PendingApproval'
  | 'PendingPreparation'
  | 'InProgress'
  | 'PendingDelivery'
  | 'Delivered'
  | 'Canceled'

export enum OrderStatusApiEnum {
  PendingPayment = 'PendingPayment',
  PendingApproval = 'PendingApproval',
  PendingPreparation = 'PendingPreparation',
  InProgress = 'InProgress',
  PendingDelivery = 'PendingDelivery',
  Delivered = 'Delivered',
  Canceled = 'Canceled'
}

export enum OrderStatusClientEnum {
  PendingPayment = 'Pendiente de pago',
  PendingApproval = 'Pendiente de aprobación',
  PendingPreparation = 'Pendiente de preparación',
  InProgress = 'En preparación',
  PendingDelivery = 'Pendiente de entrega',
  Delivered = 'Entregado',
  Canceled = 'Cancelado'
}

export type PaymentStatusType = 'Pending' | 'Completed' | 'Failure'

export enum PaymentStatusApiEnum {
  Pending = 'Pending',
  Completed = 'Completed',
  Failure = 'Failure'
}

export enum PaymentStatusClientEnum {
  Pending = 'Pago Pendiente',
  Completed = 'Pago realizado',
  Failure = 'No se realizó el pago'
}
