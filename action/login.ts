"use server"

import z, { success } from "zod";
import { LoginSchema } from "@/schema/LoginSchema";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    console.log("values", values);
    const validatedEmail = LoginSchema.safeParse(values);
    console.log("validatedEmail", validatedEmail);
    if (!validatedEmail.success) {
        return { error: "Invalid email or password" };
    }
    return { success: "Email sent"};
}