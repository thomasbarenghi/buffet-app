export interface Message {
  sender: string
  body: string
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: string
  messages: Message[]
}
