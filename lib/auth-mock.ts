// Mock authentication utilities
// In production, replace with actual Auth.js or Supabase Auth

export interface AuthUser {
  email: string
  name?: string
  provider?: string
  authenticated: boolean
}

export const isAuthenticatedMock = (): boolean => {
  return false
}

export const getCurrentUserMock = (): AuthUser | null => {
  return null
}

export const loginMock = (email: string, password: string) => {
  console.log("Mock login disabled")
  return false
}

export const loginWithOAuthMock = (provider: "github" | "google") => {
  console.log("Mock OAuth login disabled")
  return false
}

export const logoutMock = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("mock-auth-token")
  }
}
