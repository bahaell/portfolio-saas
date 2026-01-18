// Mock authentication utilities
// In production, replace with actual Auth.js or Supabase Auth

export interface AuthUser {
  email: string
  name?: string
  provider?: string
  authenticated: boolean
}

export const isAuthenticatedMock = (): boolean => {
  if (typeof window === "undefined") return true
  return localStorage.getItem("mock-auth-token") !== null
}

export const getCurrentUserMock = (): AuthUser | null => {
  if (typeof window === "undefined") return null
  const token = localStorage.getItem("mock-auth-token")
  return token ? JSON.parse(token) : null
}

export const loginMock = (email: string, password: string) => {
  const token = JSON.stringify({ email, authenticated: true, provider: "email" })
  localStorage.setItem("mock-auth-token", token)
  // Set cookie for server-side auth checking
  if (typeof document !== "undefined") {
    document.cookie = `mock-auth-token=${encodeURIComponent(token)}; path=/; max-age=${7 * 24 * 60 * 60}`
  }
  return true
}

export const loginWithOAuthMock = (provider: "github" | "google") => {
  // Simulate OAuth login
  const email = `user-${Date.now()}@${provider}.com`
  const name = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`
  const token = JSON.stringify({ email, name, authenticated: true, provider })
  localStorage.setItem("mock-auth-token", token)
  // Set cookie for server-side auth checking
  if (typeof document !== "undefined") {
    document.cookie = `mock-auth-token=${encodeURIComponent(token)}; path=/; max-age=${7 * 24 * 60 * 60}`
  }
  return true
}

export const logoutMock = () => {
  localStorage.removeItem("mock-auth-token")
  // Clear cookie for server-side auth checking
  if (typeof document !== "undefined") {
    document.cookie = "mock-auth-token=; path=/; max-age=0"
  }
}
