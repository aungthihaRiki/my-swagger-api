import React from 'react'
import { auth, signOut } from "@/auth";
import Logout from '@/app/components/Logout';

async function page() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <Logout />
    </div>
  )
}

export default page