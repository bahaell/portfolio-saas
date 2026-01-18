import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes
const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/auth/login", "/auth/signup", "/"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if this is a public route
  const isPublicRoute = publicRoutes.includes(pathname)

  // Check for auth token in cookies (set by client-side auth)
  // For demo purposes, we check if localStorage has the token
  // In production, this would be verified via secure HTTP-only cookies or session tokens
  const authCookie = request.cookies.get("mock-auth-token")
  const isLoggedIn = !!authCookie?.value

  // If trying to access dashboard without authentication, redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // If trying to access auth pages while logged in, redirect to dashboard
  if (pathname.startsWith("/auth") && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard/home", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
