"use server";

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import z, { success } from "zod";
import { LoginSchema } from "@/schema/LoginSchema";
import { signIn } from "@/auth";
import { AuthError } from 'next-auth';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log("values", values);
  const validatedEmail = LoginSchema.safeParse(values);

  console.log("validatedEmail", validatedEmail);
  if (!validatedEmail.success) {
    return { error: "Invalid email or password" };
  }
  const { email, password } = validatedEmail.data;

  try {
    await signIn("credentials", { 
        email, 
        password, 
        // redirect: false,
        DEFAULT_LOGIN_REDIRECT
    }).then((res) => {
        console.log("res", res);
        return { success: true };
    });
  } catch (error: any) {
    console.log(error);
    if (error instanceof AuthError) {
        switch (error.type) {
            case "CredentialsSignin":
                return { error: "Invalid Credentials" };
            default:
                return { error: "Unexpected error during login" };
        }
    }
    throw error;
  }
};
