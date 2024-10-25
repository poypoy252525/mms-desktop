import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username !== process.env.ADMIN_USERNAME)
          throw new Error("Username doesn't exist");

        if (credentials?.password !== process.env.ADMIN_PASSWORD)
          throw new Error("Wrong password");

        return {
          id: "1",
          email: credentials?.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
