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
    redirectTo: "/dashboard",
  };

  try {
    const res = await signIn("credentials", rawFormData);

    console.log("🔹 signIn response:", res);
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          console.log("Invalid credentials!");
          return { error: "Invalid credentials!" };
        default:
          console.log("Something went wrong!");
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  revalidatePath("/");
};
