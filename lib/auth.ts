// Mock authentication utilities
// In a real app, replace with actual auth implementation (Supabase, NextAuth, etc.)

export interface AuthUser {
  id: string
  email: string
  name: string
}

// Mock: Check if user is authenticated
export function isAuthenticated(): boolean {
  // In a real app, check session/token validity
  if (typeof window === "undefined") return false
  return !!localStorage.getItem("auth-token")
}

// Mock: Get current user
export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("current-user")
  return user ? JSON.parse(user) : null
}

// Mock: Login user
export function loginUser(email: string, password: string): void {
  // In a real app, make API call to verify credentials
  localStorage.setItem("auth-token", "mock-token-" + Date.now())
  localStorage.setItem("current-user", JSON.stringify({ id: "user-1", email, name: "User" }))
}

// Mock: Register user
export function registerUser(email: string, name: string, password: string): void {
  // In a real app, make API call to create user
  localStorage.setItem("auth-token", "mock-token-" + Date.now())
  localStorage.setItem("current-user", JSON.stringify({ id: "user-" + Date.now(), email, name }))
}

// Mock: Logout user
export function logoutUser(): void {
  localStorage.removeItem("auth-token")
  localStorage.removeItem("current-user")
}
