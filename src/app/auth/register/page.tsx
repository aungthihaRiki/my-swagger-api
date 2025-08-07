"use client";

import { RegisterSchema } from "@/schema/LoginSchema";
import { useState, useTransition } from "react";
import z, { set } from "zod";
import { register } from "../../../../action/register";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function page() {
  const [error, setError] = useState<string | undefined>("");
  const [form, setForm] = useState<z.infer<typeof RegisterSchema>>({
    name: "",
    email: "",
    password: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering:", form);

    setError("");
    startTransition(async () => {
      const data = await register(form);   
      if (data?.error) {
        setError(data.error);
        alert(data.error);
      }  
      if (data?.success) {
        toast.success(data?.success);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    })
    // TODO: Call your registration API or server action here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full text-black px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full mb-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isPending ? "Loading..." : "Register"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mx-auto w-full text-center">
          <Link href="/auth/sign-in" className="text-black">Already have an account?</Link>

        </div>
      </form>
       <Toaster />
    </div>
  );
}
