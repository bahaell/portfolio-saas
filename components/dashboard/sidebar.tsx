import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, BookOpen, Briefcase, Star, BarChart3, Settings, LogOut, Menu, X, Lock } from "lucide-react"
import { PlanType } from "@/lib/config/plans"
import { UpgradeModal } from "@/components/saas/UpgradeModal"

interface SidebarProps {
  userPlan: PlanType
}

export function Sidebar({ userPlan }: SidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const navigationItems = [
    {
      label: "Dashboard",
      href: "/dashboard/home",
      icon: LayoutDashboard,
    },
    {
      label: "Portfolios",
      href: "/dashboard/portfolios",
      icon: BookOpen,
    },
    {
      label: "Projects",
      href: "/dashboard/projects",
      icon: Briefcase,
    },
    {
      label: "Skills",
      href: "/dashboard/skills",
      icon: Star,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      premium: true,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40",
          "lg:translate-x-0 lg:relative lg:h-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8 pt-4 lg:pt-0">
            <h1 className="text-2xl font-bold text-sidebar-primary">Portfora</h1>
            <p className="text-xs text-sidebar-foreground/60 mt-1">Portfolio Builder</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              // Example logic: if item.premium is true and plan is FREE, lock it.
              // We should probably rely on a config or explicit check, but this is fine for sidebar state.
              const isLocked = item.premium && userPlan === "FREE"

              return (
                <div key={item.href}>
                  {isLocked ? (
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                        "text-sidebar-foreground/50 cursor-not-allowed opacity-70",
                      )}
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1">{item.label}</span>
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-primary/10",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Premium upgrade CTA for free users */}
          {userPlan === "FREE" && (
            <div className="mb-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-xs font-semibold text-foreground mb-2">Unlock Premium</p>
              <p className="text-xs text-foreground/70 mb-3">Get access to advanced analytics and more.</p>
              <Button
                size="sm"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => setShowUpgradeModal(true)}
              >
                Upgrade to PRO
              </Button>
            </div>
          )}

          {/* Logout */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium w-full text-sidebar-foreground hover:bg-sidebar-primary/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
