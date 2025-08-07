"use server";

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schema/LoginSchema";
import { saltAndHashPassword } from "@/utils/hashed";
import bcrypt from "bcryptjs";
import z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedField = RegisterSchema.safeParse(values);
    console.log("validatedField", validatedField);
    if (!validatedField.success) {
        return { error: "Invalid email or password" };
    }

      const { name, email, password } = validatedField.data;

      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return { error: "User already exists" };
      }

      const passwordHash = await saltAndHashPassword(password);

      await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword: passwordHash,
        },
      });

    return { success: "Created Successfully" };
}