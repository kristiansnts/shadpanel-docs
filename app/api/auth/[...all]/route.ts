import { auth, ensureDemoUser } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

const handler = toNextJsHandler(auth)

export async function GET(request: Request) {
  await ensureDemoUser()
  return handler.GET(request)
}

export async function POST(request: Request) {
  await ensureDemoUser()
  return handler.POST(request)
}
