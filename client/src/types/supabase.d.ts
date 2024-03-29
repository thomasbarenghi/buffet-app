export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

declare global {
  export type Database = {
    public: {
      Tables: {
        messages: {
          Row: {
            created_at: string
            id: number
            message: string
            order_id: string | null
            user_id: string
          }
          Insert: {
            created_at?: string
            id?: number
            message: string
            order_id?: string | null
            user_id?: string
          }
          Update: {
            created_at?: string
            id?: number
            message?: string
            order_id?: string | null
            user_id?: string
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
            code: number | null
            created_at: string
            customer_id: string | null
            id: string
            instructions: string | null
            payment_status: string
            status: string
            total_price: number
          }
          Insert: {
            code?: number | null
            created_at?: string
            customer_id?: string | null
            id?: string
            instructions?: string | null
            payment_status?: string
            status?: string
            total_price: number
          }
          Update: {
            code?: number | null
            created_at?: string
            customer_id?: string | null
            id?: string
            instructions?: string | null
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
            id: number
            order_id: string | null
            product_id: string | null
          }
          Insert: {
            created_at?: string
            id?: number
            order_id?: string | null
            product_id?: string | null
          }
          Update: {
            created_at?: string
            id?: number
            order_id?: string | null
            product_id?: string | null
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
            created_at: string
            description: string
            id: string
            preparation_time: number | null
            price: number
            thumbnail: string
            title: string
          }
          Insert: {
            created_at?: string
            description: string
            id?: string
            preparation_time?: number | null
            price: number
            thumbnail?: string
            title: string
          }
          Update: {
            created_at?: string
            description?: string
            id?: string
            preparation_time?: number | null
            price?: number
            thumbnail?: string
            title?: string
          }
          Relationships: []
        }
        profiles: {
          Row: {
            created_at: string
            dni: number | null
            first_name: string | null
            id: string
            last_name: string | null
            profile_image: string | null
            role: string | null
          }
          Insert: {
            created_at?: string
            dni?: number | null
            first_name?: string | null
            id: string
            last_name?: string | null
            profile_image?: string | null
            role?: string | null
          }
          Update: {
            created_at?: string
            dni?: number | null
            first_name?: string | null
            id?: string
            last_name?: string | null
            profile_image?: string | null
            role?: string | null
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
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
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
