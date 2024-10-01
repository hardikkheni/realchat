import { auth } from '@/utils/auth/auth';

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/') {
    return Response.redirect(new URL('/', req.nextUrl.origin));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
