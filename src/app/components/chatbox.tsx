import { createServerClient } from '@/utils/supabase/server';
import { auth } from '@/utils/auth/auth';

export default async function Chatbox() {
  const sesstion = await auth();
  const client = createServerClient('next_auth');
  const { data: account } = await client
    .from('accounts')
    .select('*')
    .filter('userId', 'eq', sesstion?.user.id)
    .maybeSingle();
  console.log(account);
  const res = await fetch(
    'https://api.linkedin.com/v2/messages?start_time=2010-01-01T00:00:00Z&end_time=2024-10-03T13:17:18Z&page_size=10',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${account?.access_token}`,
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    },
  );
  console.log(await res.json());

  return <div>Chatbox</div>;
}
