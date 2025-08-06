"use client";

import React, { useState } from 'react'
import AuthBtn from '../components/AuthBtn';
import { useFormStatus } from 'react-dom';
import { loginWithCredentials } from '../../../action/auth';

const page = () => {
    const { pending } = useFormStatus();
    const [formData, setFormData] = useState({
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
    const req = await loginWithCredentials(formData);
    console.log("req from Client", req);
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name='email'
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name='password'
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            placeholder="••••••••"
          />
        </div>


            <button className='w-full p-2 bg-blue-500 text-white rounded-md' disabled={pending} type="submit">
        {pending ? "Loading.." : "Login"}
    </button>
      </form>
    </div>
  );
}

export default page