"use client";

import { useEffect, useState } from "react";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary";
import { UpgradeBanner } from "@/components/dashboard/upgrade-banner";
import apiService, { ApiUser, ApiPortfolio } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function DashboardHome() {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [portfolios, setPortfolios] = useState<ApiPortfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await apiService.getMe();
        setUser(userData);
        if (userData) {
          const portfoliosData = await apiService.getPortfolios(userData._id);
          setPortfolios(portfoliosData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return <div>Failed to load user data.</div>;
  }

  const mappedPortfolios = portfolios.map((p) => ({
    ...p,
    id: p._id, // Map _id to id for frontend compatibility
    completionPercentage: 0, // Placeholder
    published: p.status === "published",
    template: "Custom", // Placeholder or fetch template name
    username: p.slug, // Using slug as username part for now or p.slug
    createdAt: p.createdAt ? new Date(p.createdAt) : new Date(), // Ensure Date object
    updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    views: 0, // Mock stats
    visits: 0, // Mock stats
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <UpgradeBanner userTier={user.plan === "PREMIUM" ? "premium" : "free"} />
      {/* WelcomeSection might expect specific user shape. Mapping logic... */}
      <WelcomeSection
        user={{
          ...user,
          id: user._id,
        }}
      />
      <QuickActions userPlan={user.plan} />
      <PortfolioSummary portfolios={mappedPortfolios} />
    </div>
  );
}
