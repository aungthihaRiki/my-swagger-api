// export { auth as middleware } from "@/auth"

import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/dashboard"];
export default async function middleware(req: NextRequest) {
  const session = await auth();

const isProtected = protectedRoutes.some((route) => {
  return req.nextUrl.pathname.startsWith(route);
});
  console.log("Path:", req.nextUrl.origin);
  console.log("Protected:", isProtected);
  if (!session && isProtected) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
