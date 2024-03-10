import { type User, type Chat, type Coordinates, type Product, type Shop } from '.'

export type PaymentStatus = 'Pending' | 'Completed' | 'Failure'

export interface OrderInterface {
  id: string
  dealerId: string | null
  dealer: User | null
  client: User
  clientId: string
  shipAddress: string
  status: OrderStatus
  chat: Chat
  price: number
  shipCoordinates: Coordinates
  products: Product[]
  shop: Shop
  createdAt: string
  updatedAt: string
  distance: number
  shipMapUrl: URL
  dealerRevenue: number
  paymentStatus: PaymentStatus
  shopRevenue: number
}

export type OrderStatus = 'Pending' | 'In Progress' | 'Delivered' | 'Canceled'
