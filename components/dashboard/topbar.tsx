"use client"

import type { ApiUser } from "@/lib/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, LogOut, Moon, Sun, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
// import { logoutMock } from "@/lib/auth-mock"
import { useThemeMode } from "@/lib/hooks/useThemeMode"
import { NotificationDropdown } from "./notification-dropdown"

interface TopbarProps {
  user: ApiUser
  pageTitle?: string
}

export function Topbar({ user, pageTitle }: TopbarProps) {
  const router = useRouter()
  const { mode, toggleThemeMode, mounted } = useThemeMode()

  const handleLogout = () => {
    // logoutMock()
    // For now, redirect to login which serves as logout in this demo state
    window.location.href = "/auth/login"
  }
  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{pageTitle || "Dashboard"}</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <NotificationDropdown />

          {/* Dark/Light Mode Toggle */}
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleThemeMode}>
              {mode === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
          )}

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.plan === "PREMIUM" ? "Pro" : "Free"}</p>
                </div>
                <Avatar className="w-9 h-9">
                  <AvatarImage src={"/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={"/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
