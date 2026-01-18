"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, BookOpen, Globe, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import apiService, { ApiUser, ApiPortfolio } from "@/lib/api";

export default function PortfoliosPage() {
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
        console.error("Failed to fetch portfolios:", error);
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

  // If no user logic (shouldn't happen with auth gate, but handling it)
  if (!user) return null;

  if (portfolios.length === 0) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Portfolios
          </h1>
          <p className="text-muted-foreground">
            Create and manage your professional portfolios
          </p>
        </div>

        <Card className="p-12 text-center border-border/50">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No portfolios yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Create your first portfolio to showcase your work.
          </p>
          <Link href="/dashboard/portfolio/new">
            <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="w-4 h-4" /> Create Portfolio
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Portfolios
          </h1>
          <p className="text-muted-foreground">
            Manage all your professional portfolios
          </p>
        </div>
        <Link href="/dashboard/portfolio/new">
          <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Plus className="w-4 h-4" /> New Portfolio
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolios.map((portfolio) => (
          <Card
            key={portfolio._id}
            className="p-6 border-border/50 hover:shadow-premium transition-all hover-lift overflow-hidden cursor-pointer group"
          >
            <Link href={`/dashboard/portfolios/${portfolio._id}`}>
              <div className="flex items-start justify-between mb-4 group-hover:opacity-80 transition-opacity">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {portfolio.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {/* Placeholder for template name until we fetch it or populate it */}
                    Template
                  </p>
                </div>
                {portfolio.status === "published" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs font-semibold">
                    <Globe className="w-3 h-3" /> Published
                  </span>
                )}
              </div>
            </Link>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Completion
                </span>
                <span className="text-sm font-semibold text-foreground">
                  0%
                </span>
              </div>
              <Progress value={0} />
            </div>

            <div className="flex gap-2">
              <Link
                href={`/dashboard/portfolios/${portfolio._id}/customize`}
                className="flex-1"
              >
                <Button className="w-full text-sm bg-accent hover:bg-accent/90 text-accent-foreground">
                  Customize
                </Button>
              </Link>
              <Link href={`/u/${portfolio.slug}`} className="flex-1">
                <Button
                  variant="outline"
                  className="flex-1 text-sm bg-transparent"
                >
                  View
                </Button>
              </Link>
              <Button variant="ghost" size="icon" title="Delete portfolio">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {portfolio.status === "published" && (
              <div className="mt-3 pt-3 border-t border-border/30">
                <p className="text-xs text-muted-foreground">Public URL:</p>
                <a
                  href={`/u/${portfolio.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline break-all"
                >
                  {typeof window !== "undefined"
                    ? `${window.location.origin}/u/${portfolio.slug}`
                    : `yoursite.com/u/${portfolio.slug}`}
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
