"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut({ redirectTo: "/sign-in" });
  console.log("logout");
  revalidatePath("/");
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const loginWithCredentials = async (formData: Record<string, any>) => {
  const rawFormData = {
    email: formData.email,
    password: formData.password,
    role: "ADMIN",
    redirectTo: "/",
    redirect: false,
  };

  try {
    const req: any = await signIn("credentials", rawFormData);
    console.log("req", req);
    if (!req || req.error) {
      // Parse known error format
      if (req.error?.startsWith("ERR_USER_NOT_FOUND")) {
        return { error: "User does not exist" };
      }
      return { error: req.error ?? "Login failed" };
    }
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: "Unexpected error during login" };
  }
  revalidatePath("/");
};
