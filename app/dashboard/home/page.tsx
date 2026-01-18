import { WelcomeSection } from "@/components/dashboard/welcome-section"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { UpgradeBanner } from "@/components/dashboard/upgrade-banner"
import { currentUser, mockPortfolios } from "@/lib/mock-data"

export const metadata = {
  title: "Dashboard - Portfora",
  description: "Manage your portfolios and track your progress",
}

export default function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto">
      <UpgradeBanner userTier={currentUser.plan === "PREMIUM" ? "premium" : "free"} />
      <WelcomeSection user={currentUser} />
      <QuickActions userPlan={currentUser.plan} />
      <PortfolioSummary portfolios={mockPortfolios} />
    </div>
  )
}
