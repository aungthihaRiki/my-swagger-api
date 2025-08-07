import { auth } from "@/auth";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes, ROLE_PROTECTED_ROUTES } from "./routes";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

// export const { auth: middleware } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;
  const userRole = req.auth?.user?.role as UserRole;

  console.log("ROUTE: ", req.nextUrl.pathname);
  console.log("IS LOGGEDIN: ", isLoggedIn);
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);  // always allow
  const IsPublicRoute = publicRoutes.includes(req.nextUrl.pathname);  // always allow
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);  // not always allow

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl.origin));
    }
    return null
  }

  if (!isLoggedIn && !IsPublicRoute) {
    return Response.redirect(new URL("/auth/sign-in", req.nextUrl));
  }

  // 🛡️ Role-based protection
  for (const route in ROLE_PROTECTED_ROUTES) {
    if (pathname.startsWith(route)) {
      const allowedRoles = ROLE_PROTECTED_ROUTES[route];
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
      }
    }
  }

  return null;
});

// export const config = {
// matcher: ['/(( ?!. +\.[w]+$|_next) .* )', '/', '/(api|trpc)( .* )'],
// };
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export { auth as middleware } from "@/auth"

// import { NextResponse, type NextRequest } from "next/server";
// import { auth } from "@/auth";

// const protectedRoutes = ["/dashboard"];
// export default async function middleware(req: NextRequest) {
//   const session = await auth();

// const isProtected = protectedRoutes.some((route) => {
//   return req.nextUrl.pathname.startsWith(route);
// });
//   console.log("Path:", req.nextUrl.origin);
//   console.log("Protected:", isProtected);
//   if (!session && isProtected) {
//     return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
//   }

//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };