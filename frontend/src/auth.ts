import NextAuth, { type DefaultSession, type Profile } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { OIDCConfig } from "next-auth/providers";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    DuendeIDS6Provider({
      id: "id-server",
      clientId: "nextApp",
      clientSecret: "secret",
      issuer: "http://localhost:5001",
      authorization: {
        params: {
          scope: "openid profile auctionApp",
        },
      },
      idToken: true,
    } as OIDCConfig<Omit<Profile, "username">>),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, profile }) => {
      if (profile) {
        token.username = profile.username;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.username = token.username;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
