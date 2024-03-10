import { serverUrl, supabaseAnonApiKey } from '@/utils/constants/env.const'
import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(serverUrl, supabaseAnonApiKey)
