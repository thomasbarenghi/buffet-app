// import { type User, type Chat, type Coordinates, type Product, type Shop } from '.'

import { type Product } from './product.interface'

export type PaymentStatus = 'Pending' | 'Completed' | 'Failure'

export interface OrderInterface {
  id: string
  created_at: Date
  payment_status: PaymentStatus
  total_price: number
  status: OrderStatus
  customer_id: string
  products: Product[]
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
