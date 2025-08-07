import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schema/LoginSchema";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (passwordMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
