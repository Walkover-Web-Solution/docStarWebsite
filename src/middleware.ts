import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { ANON_COOKIE, requestContext, sendEvents, type ServerEvent } from './lib/events-server'
import { PATH_TO_SLUG } from './content/pages'

// Every page has a markdown twin at /<page>.md (/index.md for the homepage), also served
// when a client asks for text/markdown. Both are rewritten to /md/<slug>.
function markdownTwin(pathname: string, wantsMd: boolean): string | null {
    if (pathname === '/index.md') return '/md/home'
    if (pathname.endsWith('.md')) {
        const slug = PATH_TO_SLUG[pathname.slice(0, -3)]
        return slug ? `/md/${slug}` : null
    }
    const slug = PATH_TO_SLUG[pathname]
    return slug && wantsMd ? `/md/${slug}` : null
}

const wantsMarkdown = (request: NextRequest) =>
    (request.headers.get('accept') || '').toLowerCase().includes('text/markdown')

// Server-side analytics: agents and crawlers never run our JavaScript, so their reads are
// logged here. People are counted by the browser tracker (page.viewed) instead.
function serverEvent(pathname: string, isHuman: boolean, servedMarkdown: boolean): string | null {
    if (pathname === '/mcp/quickstart.md') return 'agent.quickstart_fetched'
    if (pathname === '/llms.txt' || pathname === '/llms-full.txt') return 'agent.llms_fetched'
    if (servedMarkdown || pathname.endsWith('.md')) return 'agent.markdown_fetched'
    if (isHuman) return null
    return 'agent.page_fetched'
}

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const { pathname, searchParams } = request.nextUrl
    const twin = markdownTwin(pathname, wantsMarkdown(request))
    const isPage = pathname in PATH_TO_SLUG
    const servedMarkdown = !!twin
    const ctx = await requestContext(request)
    const isHuman = ctx.actorType === 'human'

    const name = serverEvent(pathname, isHuman, servedMarkdown)
    if (name) {
        const e: ServerEvent = {
            event: name,
            actorType: ctx.actorType,
            agentName: ctx.agentName,
            anonId: ctx.anonId,
            path: pathname,
            referrer: request.headers.get('referer'),
            ref: searchParams.get('ref'),
            country: ctx.country,
            uaHash: ctx.uaHash,
            props: servedMarkdown && !pathname.endsWith('.md') ? { negotiated: true } : null,
        }
        event.waitUntil(sendEvents([e]))
    }

    let response: NextResponse
    if (twin) {
        response = NextResponse.rewrite(new URL(twin, request.url))
    } else if (pathname === '/' && isHuman && request.cookies.get('isLogin')?.value === 'true') {
        return NextResponse.redirect(new URL('https://app.docstar.io/login', request.url))
    } else {
        response = NextResponse.next()
    }
    if (isPage) response.headers.set('Vary', 'Accept')

    // Anonymous visitor id for browsers: random, no personal data, used to count unique
    // visitors, join a prompt copy to its agent fetch, and keep A/B arms sticky.
    if (isHuman && !ctx.anonId && (request.headers.get('accept') || '').includes('text/html')) {
        response.cookies.set(ANON_COOKIE, crypto.randomUUID(), { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', path: '/', secure: request.nextUrl.protocol === 'https:' })
    }
    return response
}

export const config = {
    matcher: [
        // Everything except Next internals, API routes and static assets.
        '/((?!_next/|api/|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico|css|js|map|woff2?|ttf)$).*)',
    ],
}
