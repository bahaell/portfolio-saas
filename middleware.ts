import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    // Protected routes: /dashboard/*
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            const url = new URL("/auth/login", request.url)
            // url.searchParams.set("callbackUrl", encodeURI(pathname))
            return NextResponse.redirect(url)
        }
    }

    // Redirect from login if already authenticated
    if (pathname === "/auth/login") {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard/home", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/login"],
}
