"use client"

import { useState, useEffect } from "react"
import apiService, { ApiUser } from "@/lib/api"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Bell, Shield, Palette, Check, Loader2 } from "lucide-react"

export default function SettingsPage() {
  const [user, setUser] = useState<ApiUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiService.getMe()
        setUser(userData)
      } catch (error) {
        console.error("Failed to fetch user:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        Failed to load user settings. Please try again.
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Account Settings */}
        <Card className="p-6 border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Account Information</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-foreground font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">{user.email}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Subscription */}
        <Card className="p-6 border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Subscription Plan</h3>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded text-sm font-semibold ${user.plan === "PREMIUM" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                      }`}
                  >
                    {user.plan === "PREMIUM" ? "Premium" : "Free"}
                  </span>
                </div>

                {user.plan === "PREMIUM" ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">You have access to:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        Up to 5 portfolios
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        All templates including exclusive designs
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        Advanced customization (colors, fonts, spacing)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        Portfolio analytics & insights
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        Custom domain support
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-3">Current features:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-foreground" />1 portfolio
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-foreground" />2 base templates (Modern, Minimal)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-foreground" />
                        Basic color customization
                      </li>
                      <li className="flex items-center gap-2 text-sm opacity-50">
                        <span className="w-4 h-4" />
                        Analytics (Premium)
                      </li>
                      <li className="flex items-center gap-2 text-sm opacity-50">
                        <span className="w-4 h-4" />
                        Custom domain (Premium)
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {user.plan === "FREE" ? (
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Upgrade to Premium</Button>
              ) : (
                <Button variant="outline" size="sm">
                  Manage Subscription
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage how you receive notifications about your portfolios.
              </p>
              <Button variant="outline" size="sm">
                Configure Notifications
              </Button>
            </div>
          </div>
        </Card>

        {/* Theme */}
        <Card className="p-6 border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Appearance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Customize your dashboard theme and layout preferences.
              </p>
              <Button variant="outline" size="sm">
                Change Theme
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
