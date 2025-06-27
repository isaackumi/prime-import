import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname, host } = request.nextUrl

    // Skip middleware for API routes and static files
    if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // Extract subdomain
    const subdomain = host.split('.')[0]

    // Check if this is a subdomain (not www, localhost, or main domain)
    if (host.includes('.') && subdomain !== 'www' && subdomain !== 'localhost') {
        // If we're on a subdomain and not already on a store route, redirect to store route
        if (!pathname.startsWith(`/${subdomain}`)) {
            const url = request.nextUrl.clone()
            url.pathname = `/${subdomain}${pathname}`
            return NextResponse.rewrite(url)
        }
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
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
} 