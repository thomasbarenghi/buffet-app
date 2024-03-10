// import { type User, type Chat, type Coordinates, type Product, type Shop } from '.'

export type PaymentStatus = 'Pending' | 'Completed' | 'Failure'

export interface OrderInterface {
  id: string
  created_at: Date
  payment_status: PaymentStatus
  total_price: number
  status: OrderStatus
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
