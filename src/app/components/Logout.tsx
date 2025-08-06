"use client";
import React from 'react'
import { logout } from '../../../action/auth';

const Logout = () => {
  return (
    <div>
        <button onClick={() => logout()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Logout
        </button>
    </div>
  )
}

export default Logout