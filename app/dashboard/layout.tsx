"use client"

import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { useEffect, useState } from "react"
import apiService, { ApiUser } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated") {
      const fetchUser = async () => {
        try {
          const userData = await apiService.getMe()
          setUser(userData)
        } catch (error) {
          console.error("Failed to load user", error)
        } finally {
          setLoading(false)
        }
      }
      fetchUser()
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return <div>Failed to load user data</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userPlan={user.plan} />
      <div className="flex-1 flex flex-col ml-0 lg:ml-0">
        <Topbar user={user} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
