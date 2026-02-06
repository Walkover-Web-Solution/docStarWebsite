import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const isLogin = request.cookies.get('isLogin')?.value

    if (isLogin === 'true') {
        return NextResponse.redirect(new URL('https://app.docstar.io/login', request.url))
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
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
        '/',
    ],
}
