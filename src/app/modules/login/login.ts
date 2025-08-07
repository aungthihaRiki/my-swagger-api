"use client"
import { signIn } from "@/auth";

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
};