#!/usr/bin/env node
/**
 * Crawl the running Next.js server for internal links and report 404s.
 * Usage: node scripts/crawl-internal-links.mjs http://127.0.0.1:3000
 */
const ORIGIN = process.argv[2] || "http://127.0.0.1:3000"
const MAX_PAGES = 250
const skipPrefix = ["/admin", "/api", "/_next", "/_pagefind"]

function isInternal(href) {
  if (!href) return false
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return false
  if (href.startsWith("#")) return false
  try {
    const url = new URL(href, ORIGIN)
    return url.origin === new URL(ORIGIN).origin
  } catch {
    return false
  }
}

function normalize(href) {
  const url = new URL(href, ORIGIN)
  url.hash = ""
  let path = url.pathname
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path + url.search
}

function extractHrefs(html) {
  const hrefs = []
  const re = /(?:href|src)=["']([^"']+)["']/gi
  let m
  while ((m = re.exec(html))) hrefs.push(m[1])
  return hrefs
}

async function fetchPage(path) {
  const res = await fetch(ORIGIN + path, { redirect: "manual" })
  const location = res.headers.get("location")
  const contentType = res.headers.get("content-type") || ""
  let body = ""
  if (
    contentType.includes("text/html") ||
    contentType.includes("text/plain") ||
    contentType.includes("xml") ||
    contentType.includes("json") ||
    contentType.includes("icon") ||
    contentType.includes("image") ||
    contentType.includes("manifest")
  ) {
    if (contentType.includes("text") || contentType.includes("json") || contentType.includes("xml") || contentType.includes("manifest")) {
      body = await res.text()
    } else {
      await res.arrayBuffer()
    }
  } else {
    await res.arrayBuffer().catch(() => {})
  }
  return { status: res.status, location, contentType, body }
}

const queue = [
  "/",
  "/favicon.ico",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
  "/og-image.png",
  "/robots.txt",
  "/sitemap.xml",
  "/site.webmanifest",
]
const seen = new Set()
const results = []
const broken = []

while (queue.length && seen.size < MAX_PAGES) {
  const path = queue.shift()
  if (seen.has(path)) continue
  if (skipPrefix.some((p) => path === p || path.startsWith(p + "/"))) continue
  seen.add(path)

  let status, location, contentType, body
  try {
    ;({ status, location, contentType, body } = await fetchPage(path))
  } catch (err) {
    broken.push({ path, status: 0, reason: String(err) })
    continue
  }

  results.push({ path, status, location: location || "", contentType })

  if (status >= 400) {
    broken.push({ path, status, reason: "HTTP error" })
    continue
  }

  if (status >= 300 && status < 400 && location) {
    const next = normalize(location)
    if (isInternal(location) && !seen.has(next)) queue.push(next)
    continue
  }

  if (!body) continue

  for (const href of extractHrefs(body)) {
    if (!isInternal(href)) continue
    const next = normalize(href)
    if (skipPrefix.some((p) => next === p || next.startsWith(p + "/"))) continue
    if (!seen.has(next) && !queue.includes(next)) queue.push(next)
  }
}

const ok = results.filter((r) => r.status < 400)
console.log(`Crawled ${results.length} URLs, ${broken.length} broken`)
if (broken.length) {
  console.log("BROKEN:")
  for (const b of broken) console.log(`  ${b.status} ${b.path} ${b.reason}`)
}
process.exit(broken.length ? 1 : 0)
