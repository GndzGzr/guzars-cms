import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    token?: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Django CMS",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        
        try {
          // Send login request to Django Backend 
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/`, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            }),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          
          if (res.ok && (data.token || data.access || data.auth_token)) {
            return {
              id: "1", // Django might return user ID, mock or use if available
              username: credentials.username,
              token: data.token || data.access || data.auth_token,
            };
          }
          return null;
        } catch (e) {
          console.error("Authorization error:", e);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.username = token.username;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login', // Custom login page
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_dev_secret_guzars_cms_123",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
