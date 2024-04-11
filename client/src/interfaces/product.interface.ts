export interface Product {
  id: string
  created_at: Date | string
  title: string
  description: string
  price: number
  preparation_time: number | null
  thumbnail: string
  category_id: string
  category?: Category | null
}

export interface Category {
  id: number
  title: string
  created_at: string
}
