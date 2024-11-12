import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID,
      clientSecret: process.env.AUTH_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOGGLE_ID,
      clientSecret: process.env.AUTH_GOGGLE_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const { displayName, email, password } = credentials;
        const user = { id: '', name: '', email: '', image: '' };

        // 사용자 이름이 있는 경우, 회원가입!
        if (displayName) {
          // <회원가입 로직 ...>
          return { ...user, accessToken: '<ACCESS_TOKEN>' };
        }

        // <로그인 로직 ...>
        return { ...user, accessToken: '<ACCESS_TOKEN>' };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      console.log(account);
      console.log(profile);
      if (account?.provider === 'google' && profile) {
        return true;
      }

      if (account?.provider === 'kakao') {
        return true;
      }

      return true;
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }

      if (trigger === 'update' && session) {
        Object.assign(token, session.user);
        token.picture = session.user.image; // 사진을 변경했을 때 반영!
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (url) {
        const { search, origin } = new URL(url);
        const callbackUrl = new URLSearchParams(search).get('callback');
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl;
        if (origin === baseUrl) return url;
      }
      return baseUrl;
    },
  },
});
