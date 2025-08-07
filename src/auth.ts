import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { prisma } from "./lib/prisma";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import bcrypt from "bcryptjs";
// import { prisma } from "./lib/prisma";
// import Credentials from "next-auth/providers/credentials";

// export const {
//   handlers: { GET, POST },
//   signIn,
//   signOut,
//   auth,
// } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) return null;

//         const user = await prisma.user.findUnique({ where: { email: credentials.email as string } });
//         if (!user) {
//           console.log("User NOT Found");
//           throw new Error("ERR_USER_NOT_FOUND: User does not exist");
//         };

//         const isValid = await bcrypt.compare(credentials.password as string, user.hashedPassword as string);
//         if (!isValid) {
//           console.log("Invalid email or password");
//           throw new Error("ERR_INVALID_PASSWORD: Password is incorrect");
//         }

//         console.log("login success", user);
//         return { id: user.id, email: user.email, name: user.name, role: user.role };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/sign-in",
//   },
// });
