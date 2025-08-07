/**
* An array of routes that are accessible to the public
* These routes do not require authentication
* @type {string[]}
*/
export const publicRoutes = ["/"];

/**
* An array of routes that are used for authentication
* These routes will redirect logged in users to /settings
* @type {string[]}
*/
export const authRoutes = [
"/auth/sign-in",
"/auth/register",
];

/**
* The prefix for API authentication routes
* Routes that start with this prefix åre used for API
authentication purposes
* @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/**
* The default redirect path after logging in
* @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/userinfo";

/**
* The path base on which role-based protection is applied
* @type {string}
*/
export const ROLE_PROTECTED_ROUTES: Record<string, string[]> = { 
  "/dashboard": ["ADMIN"],
  "/userinfo": ["ADMIN", "USER"],
};