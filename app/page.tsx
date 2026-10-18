"use client"

import { Search, Github, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Shadpanel</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </a>
               <a href="https://shadpanel-demo.vercel.app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Demo
              </a>
            </nav>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
            </div>
            <a 
            className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
            href="https://github.com/kristiansnts/shadpanel"
            >
              <Github className="w-5 h-5" />
            </a>
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold mb-6 text-balance">Shadpanel</h1>
          <p className="text-lg text-muted-foreground mb-4 text-balance">
            Admin Panel CLI 1.6.0 — Next.js 16, Better Auth, Prisma 6.18
          </p>
           <a href="/docs" className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer">
              Get Started
            </a>
            <div className="flex items-center justify-center">
              <div className="relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText("npm install -g shadpanel")
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="mt-6 flex items-center gap-2 justify-center hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Copy to clipboard"
            >
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z" />
              </svg>
              <code className="text-xs text-muted-foreground">~ npm install -g shadpanel</code>
            </button>
            {copied && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 bg-foreground text-background px-3 py-1.5 rounded-md text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                Copied!
              </div>
            )}
          </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Shadpanel.</p>
        </div>
      </footer>
    </div>
  )
}
