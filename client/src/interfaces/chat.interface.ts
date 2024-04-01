import { type Profile } from './user.interface'

export interface Message {
  user_id: string | null
  order_id: string | null
  message: string
  createdAt: Date
  id: string
  user?: Profile
}
