import { auth, signIn, signOut } from '@/utils/auth/auth';
import Image from 'next/image';

export default async function Home() {
  const user = await auth();
  return (
    <div className="flex h-screen items-center justify-center">
      {!user && (
        <form
          action={async () => {
            'use server';
            await signIn('linkedin');
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      )}

      {user && (
        <div>
          <p>Hello, {user.user.name}</p>
          {user.user.image && (
            <Image src={user.user.image} alt="user" className="rounded-full" width={100} height={100} />
          )}
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </div>
      )}
    </div>
  );
}
