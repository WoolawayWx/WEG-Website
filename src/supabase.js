import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxvuigbyexdarrlusojh.supabase.co'
const supabaseKey = import.meta.env.VITE_APP_SUPAKEY

export const supabase = createClient(supabaseUrl,supabaseKey);