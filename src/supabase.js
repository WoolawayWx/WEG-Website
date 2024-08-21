import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_APP_SUPAURL
const supabaseKey = import.meta.env.VITE_APP_SUPAKEY

export const supabase = createClient(supabaseUrl,supabaseKey);