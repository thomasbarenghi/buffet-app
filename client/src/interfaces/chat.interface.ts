import { type Profile } from './user.interface'

export interface Message {
  user_id: string | null
  order_id: string | null
  message: string
  created_at: string
  id: string
  user?: Profile
}
