import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { ANON_COOKIE, requestContext, sendEvents, type ServerEvent } from './lib/events-server'
import { PATH_TO_SLUG } from './content/pages'
import { ARMS_COOKIE, assign, readArms, runningExperiments, variantPath } from './lib/experiments'

// Every page has a markdown twin at /<page>.md (/index.md for the homepage), also served
// when a client asks for text/markdown. Both are rewritten to /md/<slug>.
// /home is the homepage. Its markdown twin is the homepage twin (/index.md and /home.md).
const HOME_ROUTE = '/home'

function markdownTwin(pathname: string, wantsMd: boolean): string | null {
    if (pathname === '/index.md' || pathname === '/home.md') return '/md/home'
    if (pathname.endsWith('.md')) {
        const slug = PATH_TO_SLUG[pathname.slice(0, -3)]
        return slug ? `/md/${slug}` : null
    }
    const slug = pathname === HOME_ROUTE ? 'home' : PATH_TO_SLUG[pathname]
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

async function handle(request: NextRequest, event: NextFetchEvent) {
    const { pathname, searchParams } = request.nextUrl

    // The admin and the A/B test versions (/xv/…) are private: not tracked, not indexed.
    if (pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/xv/')) {
        const response = NextResponse.next()
        response.headers.set('X-Robots-Tag', 'noindex, nofollow')
        return response
    }
    const twin = markdownTwin(pathname, wantsMarkdown(request))
    // /home renders the homepage, so page detection and tests follow /.
    const contentPath = pathname === HOME_ROUTE ? '/' : pathname
    const isPage = contentPath in PATH_TO_SLUG
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
            ref: searchParams.get('ref'),
            props: servedMarkdown && !pathname.endsWith('.md') ? { negotiated: true } : null,
        }
        event.waitUntil(sendEvents([e], request.nextUrl.origin))
    }

    // Anonymous visitor id for browsers: random, no personal data, used to count unique
    // visitors, join a prompt copy to its agent fetch, and keep A/B variants sticky.
    const browserPage = isHuman && request.method === 'GET' && (request.headers.get('accept') || '').includes('text/html')
    const anonId = ctx.anonId || (browserPage ? crypto.randomUUID() : null)

    // A/B tests: people only, never agents, crawlers or the .md twins.
    let arms: Record<string, string> | null = null
    let variantUrl: string | null = null
    if (browserPage && anonId && !twin) {
        const running = await runningExperiments(request.nextUrl.origin)
        if (running.length) {
            const saved = readArms(request.cookies.get(ARMS_COOKIE)?.value)
            arms = {}
            for (const x of running) {
                const kept = x.variants.find((v) => v.key === saved[x.key])
                const v = kept || (await assign(anonId, x))
                arms[x.key] = v.key
                if (x.path === contentPath) variantUrl = variantPath(v.revisionId, contentPath)
            }
        } else if (request.cookies.get(ARMS_COOKIE)) {
            arms = {}
        }
    }

    let response: NextResponse
    if (twin) {
        response = NextResponse.rewrite(new URL(twin, request.url))
    } else if ((pathname === '/' || pathname === HOME_ROUTE) && isHuman && request.cookies.get('isLogin')?.value === 'true') {
        return NextResponse.redirect(new URL('https://app.docstar.io/login', request.url))
    } else if (variantUrl) {
        response = NextResponse.rewrite(new URL(variantUrl, request.url))
        // one page, several versions: never let a shared cache hand one version to everyone
        response.headers.set('Cache-Control', 'private, no-store')
    } else {
        response = NextResponse.next()
    }
    if (isPage) response.headers.set('Vary', 'Accept')

    const cookie = { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' as const, path: '/', secure: request.nextUrl.protocol === 'https:' }
    if (browserPage && !ctx.anonId && anonId) response.cookies.set(ANON_COOKIE, anonId, cookie)
    // readable by the page's tracker, which tags every event with the visitor's variants
    if (arms) {
        if (Object.keys(arms).length) response.cookies.set(ARMS_COOKIE, JSON.stringify(arms), cookie)
        else response.cookies.delete(ARMS_COOKIE)
    }
    return response
}

// The pre-launch copy on test.docstar.io must stay out of search engines. Only the test host is
// affected; docstar.io is unchanged, so moving the domain needs no code change.
const isTestHost = (request: NextRequest) => request.nextUrl.hostname.startsWith('test.')

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    if (isTestHost(request) && request.nextUrl.pathname === '/robots.txt') {
        return new NextResponse('User-agent: *\nDisallow: /\n', { headers: { 'content-type': 'text/plain' } })
    }
    const response = await handle(request, event)
    if (isTestHost(request)) response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
}

export const config = {
    matcher: [
        // Everything except Next internals, API routes and static assets.
        '/((?!_next/|api/|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico|css|js|map|woff2?|ttf)$).*)',
    ],
}
