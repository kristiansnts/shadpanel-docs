import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { SITE_URL } from "@/lib/site"

/**
 * Public docs demo: no DATABASE_URL. Better Auth falls back to an in-memory
 * adapter. Sessions stay valid across Vercel isolates via cookie cache
 * (`refreshCache: true` refreshes the cookie without a DB round-trip).
 *
 * Generated CLI apps use prismaAdapter + lib/prisma.ts instead.
 */
const DEMO_FALLBACK_SECRET = "shadpanel-docs-public-demo-secret"

function getBaseURL() {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

function trustedOrigins() {
  const origins = new Set([SITE_URL, "http://localhost:3000", "http://127.0.0.1:3000"])
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`)
  }
  if (process.env.BETTER_AUTH_URL) {
    origins.add(process.env.BETTER_AUTH_URL)
  }
  return [...origins]
}

const googleId = process.env.GOOGLE_CLIENT_ID
const googleSecret = process.env.GOOGLE_CLIENT_SECRET
const githubId = process.env.GITHUB_CLIENT_ID
const githubSecret = process.env.GITHUB_CLIENT_SECRET

export const DEMO_EMAIL = "admin@example.com"
export const DEMO_PASSWORD = "admin123"

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || DEMO_FALLBACK_SECRET,
  baseURL: getBaseURL(),
  trustedOrigins: trustedOrigins(),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(googleId && googleSecret
      ? { google: { clientId: googleId, clientSecret: googleSecret } }
      : {}),
    ...(githubId && githubSecret
      ? { github: { clientId: githubId, clientSecret: githubSecret } }
      : {}),
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      strategy: "compact",
      maxAge: 60 * 60 * 24 * 7,
      refreshCache: true,
    },
  },
  plugins: [nextCookies()],
})

let demoUserReady: Promise<void> | null = null

/** Seed the in-memory demo account on each serverless isolate. */
export function ensureDemoUser() {
  if (!demoUserReady) {
    demoUserReady = auth.api
      .signUpEmail({
        body: {
          name: "Admin User",
          email: DEMO_EMAIL,
          password: DEMO_PASSWORD,
        },
      })
      .then(() => undefined)
      .catch(() => undefined)
  }
  return demoUserReady
}
