"use client";

import React, { useState, useTransition } from "react";
import AuthBtn from "../../components/AuthBtn";
import { useFormStatus } from "react-dom";
import { loginWithCredentials } from "@/app/modules/login/login";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../../../action/login";
import z, { set } from "zod";
import { LoginSchema } from "@/schema/LoginSchema";
import Link from "next/link";

const page = () => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { pending } = useFormStatus();
  const [formData, setFormData] = useState<z.infer<typeof LoginSchema>>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Replace with your auth logic
    console.log("formData", formData);
    // try {
    //   const req = await loginWithCredentials(formData);
    //   console.log("req", req);
    // } catch (error: any) {
    //   toast.error(error.message);
    // }
    setError("");
    startTransition(async () => {
      login(formData).then((data) => {
        console.log("data", data);
        setError(data?.error);
        // if (data.success) {
        //   toast.success(data.success);
        // }
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign In
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="••••••••"
          />
        </div>

        <button
          className="w-full mb-3 p-2 bg-blue-500 text-white rounded-md"
          disabled={pending}
          type="submit"
        >
          {pending ? "Loading.." : "Login"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mx-auto w-full text-center">
          <Link href="/auth/register" className="text-black">
            You don't have an account?
          </Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default page;
