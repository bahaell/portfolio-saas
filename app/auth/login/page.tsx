"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Github, Mail } from "lucide-react"
import { useState } from "react"
import { loginWithOAuthMock, loginMock } from "@/lib/auth-mock"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("sarah@example.com")
  const [password, setPassword] = useState("password")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      loginMock(email, password)
      router.push("/dashboard/home")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: "github" | "google") => {
    setIsLoading(true)
    try {
      loginWithOAuthMock(provider)
      router.push("/dashboard/home")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </Link>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/50">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <div className="space-y-4 mb-6">
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => handleOAuthLogin("github")}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>Continue with GitHub</span>
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                onClick={() => handleOAuthLogin("google")}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Continue with Google</span>
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Signing in..." : "Sign in with Email"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
