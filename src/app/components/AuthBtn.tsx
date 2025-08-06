"use client";
import React from 'react'
import { useFormStatus } from 'react-dom';

const AuthBtn = () => {
    const { pending } = useFormStatus();
  return (
    <button className='w-full p-2 bg-blue-500 text-white rounded-md' disabled={pending} type="submit">
        {pending ? "Loading.." : "Login"}
    </button>
  )
}

export default AuthBtn