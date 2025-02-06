import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    // jwt({ token, user }) {
    //   if (user) token.id = user.id;
    //   return token;
    // },
    // session({ session, user }) {
    //   session.user.id = user.id;
    //   return session;
    // },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/app');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/app', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;