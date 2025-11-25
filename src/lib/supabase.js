import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('URL:', supabaseUrl)          // سطر جديد للتشخيص
console.log('KEY:', supabaseAnonKey)       // سطر جديد للتشخيص

export const supabase = createClient(supabaseUrl, supabaseAnonKey)