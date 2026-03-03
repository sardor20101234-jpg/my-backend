import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('[Supabase] Missing credentials! Check .env');
} else {
    console.log('[Supabase] Client initialized for:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
