import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or API Key')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
