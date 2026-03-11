import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Define Database Types
export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  condition: string;
  price: number;
  originalPrice: number;
  image: string;
  description: string;
};
