import { type Profile } from './user.interface'

export interface Message {
  user_id: string
  order_id: string
  message: string
  createdAt: Date
  id: string
  user: Profile
}
