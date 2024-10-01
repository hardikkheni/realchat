import { auth, signIn, signOut } from '@/utils/auth/auth';
import Image from 'next/image';

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex h-screen items-center justify-center">
      {!session && (
        <form
          action={async () => {
            'use server';
            await signIn('linkedin');
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      )}

      {session && (
        <div>
          <p>Hello, {session.user.name}</p>
          {session.user.image && (
            <Image src={session.user.image} alt="user" className="rounded-full" width={100} height={100} />
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
