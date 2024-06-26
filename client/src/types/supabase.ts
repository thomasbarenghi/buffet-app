export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

declare global {
  export type Database = {
    public: {
      Tables: {
        cash_authorizations: {
          Row: {
            authorized_by: string | null
            created_at: string
            id: string
            is_authorized: boolean
          }
          Insert: {
            authorized_by?: string | null
            created_at?: string
            id: string
            is_authorized?: boolean
          }
          Update: {
            authorized_by?: string | null
            created_at?: string
            id?: string
            is_authorized?: boolean
          }
          Relationships: [
            {
              foreignKeyName: 'public_cash_authorizations_authorized_by_fkey'
              columns: ['authorized_by']
              isOneToOne: false
              referencedRelation: 'profiles'
              referencedColumns: ['id']
            },
            {
              foreignKeyName: 'public_cash_authorizations_id_fkey'
              columns: ['id']
              isOneToOne: true
              referencedRelation: 'profiles'
              referencedColumns: ['id']
            }
          ]
        }
        categories: {
          Row: {
            created_at: string
            id: number
            title: string
          }
          Insert: {
            created_at?: string
            id?: number
            title: string
          }
          Update: {
            created_at?: string
            id?: number
            title?: string
          }
          Relationships: []
        }
        messages: {
          Row: {
            created_at: string
            id: string
            message: string
            order_id: string | null
            user_id: string | null
          }
          Insert: {
            created_at?: string
            id?: string
            message: string
            order_id?: string | null
            user_id?: string | null
          }
          Update: {
            created_at?: string
            id?: string
            message?: string
            order_id?: string | null
            user_id?: string | null
          }
          Relationships: [
            {
              foreignKeyName: 'public_messages_order_id_fkey'
              columns: ['order_id']
              isOneToOne: false
              referencedRelation: 'orders'
              referencedColumns: ['id']
            },
            {
              foreignKeyName: 'public_messages_user_id_fkey'
              columns: ['user_id']
              isOneToOne: false
              referencedRelation: 'profiles'
              referencedColumns: ['id']
            }
          ]
        }
        orders: {
          Row: {
            code: number
            created_at: string
            customer_id: string | null
            id: string
            instructions: string | null
            payment_link: string | null
            payment_method: string
            payment_status: string
            status: string
            total_price: number
          }
          Insert: {
            code?: number
            created_at?: string
            customer_id?: string | null
            id?: string
            instructions?: string | null
            payment_link?: string | null
            payment_method?: string
            payment_status?: string
            status?: string
            total_price: number
          }
          Update: {
            code?: number
            created_at?: string
            customer_id?: string | null
            id?: string
            instructions?: string | null
            payment_link?: string | null
            payment_method?: string
            payment_status?: string
            status?: string
            total_price?: number
          }
          Relationships: [
            {
              foreignKeyName: 'public_orders_customer_id_fkey'
              columns: ['customer_id']
              isOneToOne: false
              referencedRelation: 'profiles'
              referencedColumns: ['id']
            }
          ]
        }
        orders_products: {
          Row: {
            created_at: string
            id: string
            order_id: string | null
            product_id: string | null
            quantity: number
          }
          Insert: {
            created_at?: string
            id?: string
            order_id?: string | null
            product_id?: string | null
            quantity?: number
          }
          Update: {
            created_at?: string
            id?: string
            order_id?: string | null
            product_id?: string | null
            quantity?: number
          }
          Relationships: [
            {
              foreignKeyName: 'public_orders_products_order_id_fkey'
              columns: ['order_id']
              isOneToOne: false
              referencedRelation: 'orders'
              referencedColumns: ['id']
            },
            {
              foreignKeyName: 'public_orders_products_product_id_fkey'
              columns: ['product_id']
              isOneToOne: false
              referencedRelation: 'products'
              referencedColumns: ['id']
            }
          ]
        }
        products: {
          Row: {
            category_id: number | null
            created_at: string
            description: string
            id: string
            preparation_time: number | null
            price: number
            thumbnail: string
            title: string
          }
          Insert: {
            category_id?: number | null
            created_at?: string
            description: string
            id?: string
            preparation_time?: number | null
            price: number
            thumbnail?: string
            title: string
          }
          Update: {
            category_id?: number | null
            created_at?: string
            description?: string
            id?: string
            preparation_time?: number | null
            price?: number
            thumbnail?: string
            title?: string
          }
          Relationships: [
            {
              foreignKeyName: 'public_products_category_fkey'
              columns: ['category_id']
              isOneToOne: false
              referencedRelation: 'categories'
              referencedColumns: ['id']
            }
          ]
        }
        profiles: {
          Row: {
            created_at: string
            dni: number
            first_name: string
            id: string
            last_name: string
            profile_image: string
            role: string
          }
          Insert: {
            created_at?: string
            dni: number
            first_name: string
            id: string
            last_name: string
            profile_image?: string
            role?: string
          }
          Update: {
            created_at?: string
            dni?: number
            first_name?: string
            id?: string
            last_name?: string
            profile_image?: string
            role?: string
          }
          Relationships: [
            {
              foreignKeyName: 'public_profiles_id_fkey'
              columns: ['id']
              isOneToOne: true
              referencedRelation: 'users'
              referencedColumns: ['id']
            }
          ]
        }
        shop_config: {
          Row: {
            created_at: string
            id: string
            is_open: boolean
          }
          Insert: {
            created_at?: string
            id?: string
            is_open?: boolean
          }
          Update: {
            created_at?: string
            id?: string
            is_open?: boolean
          }
          Relationships: []
        }
      }
      Views: {
        [_ in never]: never
      }
      Functions: {
        [_ in never]: never
      }
      Enums: {
        [_ in never]: never
      }
      CompositeTypes: {
        [_ in never]: never
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
