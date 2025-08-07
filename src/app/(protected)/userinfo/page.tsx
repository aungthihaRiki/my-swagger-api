import Logout from '@/app/components/Logout'
import { auth } from '@/auth'
import React from 'react'

const page = async () => {
  const session = await auth()
  // const { name, email, role } = session;
  return (
    <div>
        User Info
        { JSON.stringify(session) }

        <Logout />
    </div>
  )
}

export default page