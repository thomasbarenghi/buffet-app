import { type Coordinates, type Product } from '.'

export interface Shop {
  id: string
  products: Product[]
  name: string
  address: string
  description: string
  phone: string
  coordinates: Coordinates
  mapUrl: URL
  thumbnail?: string
  createdAt: Date
  updatedAt: Date
}
