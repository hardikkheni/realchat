import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/db';

export function createServerClient<SchemaName extends string & keyof Database>(
  schemaName: SchemaName = 'public' as SchemaName,
) {
  return createClient<Database, SchemaName>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      db: { schema: schemaName },
      global: { headers: { 'X-Client-Info': '@auth/supabase-adapter' } },
      auth: { persistSession: false },
    },
  );
}
