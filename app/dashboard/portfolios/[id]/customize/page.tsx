"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ThemeBuilder } from "@/components/builder/theme-builder";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { PortfolioData } from "@/lib/types/theme";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Save, RotateCcw, Loader2 } from "lucide-react";
import Link from "next/link";
import apiService, {
  ApiUser,
  ApiPortfolio,
  ApiProject,
  ApiSkill,
} from "@/lib/api";

export default function CustomizePortfolioPage() {
  const params = useParams();
  const router = useRouter();
  const portfolioId = params.id as string;
  const [isSaving, setIsSaving] = useState(false);
  const [selectedThemeId, setSelectedThemeId] = useState("modern");
  const [themeOverrides, setThemeOverrides] = useState({});

  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<ApiPortfolio | null>(null);
  const [user, setUser] = useState<ApiUser | null>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioRes, userRes, projectsRes, skillsRes] =
          await Promise.all([
            apiService.getPortfolio(portfolioId),
            apiService.getMe(),
            apiService.getProjects(portfolioId),
            apiService.getSkills(portfolioId),
          ]);

        setPortfolio(portfolioRes);
        setUser(userRes);

        if (portfolioRes.theme?.themeId) {
          // Assuming themeId is the string ID.
          // In real API it might be populated object if I populated it?
          // My GET /api/portfolios/:id populates theme.themeId.
          // So portfolioRes.theme.themeId might be an object if populated.
          // Let's check api response type.
          // For now I'll handle if it's object or string.
          const themeIdVal =
            typeof portfolioRes.theme.themeId === "object"
              ? (portfolioRes.theme.themeId as any)._id
              : portfolioRes.theme.themeId;
          setSelectedThemeId(themeIdVal || "modern");
          setThemeOverrides(portfolioRes.theme.overrides || {});
        }

        // Construct PortfolioData
        const constructedData: PortfolioData = {
          id: portfolioRes._id,
          title: portfolioRes.title,
          description: portfolioRes.slug || "", // Fallback
          name: userRes.name,
          email: userRes.email,
          phone: "", // Not in DB
          website: "", // Not in DB
          social: {
            linkedin: "",
            github: "",
            twitter: "",
          },
          projects: projectsRes.map((p) => ({
            id: p._id,
            title: p.title,
            description: p.description,
            tags: p.stack,
            link: p.demoUrl || p.githubUrl,
          })),
          skills: skillsRes.map((s) => ({
            id: s._id,
            name: s.name,
            level: s.level.toLowerCase() as any, // Map to expected lower case
          })),
          about: "", // Not in DB yet
        };
        setPortfolioData(constructedData);
      } catch (error) {
        console.error("Failed to load portfolio data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [portfolioId]);

  const handleSaveTheme = async (themeData: {
    themeId: string;
    overrides: Record<string, any>;
  }) => {
    setIsSaving(true);
    try {
      // Update portfolio theme ref and overrides
      await apiService.updatePortfolio(portfolioId, {
        theme: {
          themeId: themeData.themeId,
          overrides: themeData.overrides,
        },
      });
      // Update local state to reflect saved changes
      setSelectedThemeId(themeData.themeId);
      setThemeOverrides(themeData.overrides);
    } catch (error) {
      console.error("Failed to save theme:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!portfolio || !portfolioData || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-white">
            Portfolio not found
          </h1>
          <Link href="/dashboard/portfolios">
            <Button variant="outline">Back to Portfolios</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine initialThemeId from state which came from DB
  const currentThemeId = selectedThemeId || "modern";

  return (
    <ThemeProvider initialThemeId={currentThemeId}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Top Navigation */}
        <div className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/60 border-b border-slate-700/50 shadow-lg">
          <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/portfolios">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-800/60 text-slate-300 hover:text-white transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Link
                  href="/dashboard/portfolios"
                  className="hover:text-slate-300"
                >
                  Portfolios
                </Link>
                <span>/</span>
                <Link
                  href={`/dashboard/portfolios/${portfolioId}`}
                  className="hover:text-slate-300"
                >
                  {portfolio.title}
                </Link>
                <span>/</span>
                <span className="text-white">Customize</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="text-slate-300 hover:text-white hover:bg-slate-800 bg-transparent"
                onClick={() =>
                  handleSaveTheme({
                    themeId: selectedThemeId,
                    overrides: themeOverrides,
                  })
                }
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                disabled={isSaving}
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 transition-all duration-200 disabled:opacity-50"
                onClick={() =>
                  handleSaveTheme({
                    themeId: selectedThemeId,
                    overrides: themeOverrides,
                  })
                }
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ThemeBuilder
            initialThemeId={currentThemeId}
            portfolio={portfolioData}
            userTier={user.plan === "FREE" ? "free" : "premium"}
            onSave={handleSaveTheme}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
