import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/db';

export function createClient<SchemaName extends string & keyof Database = 'public'>() {
  return createBrowserClient<Database, SchemaName>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
