// Supabase client utility
const { createClient } = require('@supabase/supabase-js');

// These environment variables should be set in your Vercel project
// They are automatically added when you integrate Supabase through Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
