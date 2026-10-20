import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

/**
 * Next.js 16 proxy (CLI 1.6.0). Runs on the Node.js runtime.
 * This docs site is still Next.js 15 (Nextra), so Next will not execute
 * `proxy.ts` until the app is upgraded. Dashboard protection also lives in
 * `app/admin/layout.tsx` (same client gate the CLI generates).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
}
