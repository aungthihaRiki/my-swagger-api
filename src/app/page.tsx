import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <h1>Landing Page...</h1>
      <div>
        {session ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/">Logout</Link>
          </button>
        ) : (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/sign-in">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
}
