import { SupabaseAdapter } from '@auth/supabase-adapter';
import NextAuth from 'next-auth';
import LinkedIn from 'next-auth/providers/linkedin';
import { SignJWT } from 'jose';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    LinkedIn({
      authorization: {
        params: {
          // scope: 'email,openid,profile,r_ads,rw_conversions',
          scope: 'email,openid,profile',
        },
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  debug: process.env.NODE_ENV !== 'production',
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: 'authenticated',
        };
        session.supabaseAccessToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .sign(new TextEncoder().encode(signingSecret));
      }
      return session;
    },
  },
});
