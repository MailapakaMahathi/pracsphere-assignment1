import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compare } from "bcryptjs";
import clientPromise from "./mongodb";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Please enter valid credentials");
        }

        const client = await clientPromise;
        const db = client.db("Mahathidb");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) throw new Error("No user found with this email");
        if (typeof user.password !== "string") throw new Error("Invalid stored password");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
};

// ✅ Export the new v5 handlers
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
