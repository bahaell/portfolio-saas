import { getPublicPortfolio } from "@/lib/public-api"
import { ClassicProTemplate } from "@/components/public/templates/classic-pro"
import { ModernVisualTemplate } from "@/components/public/templates/modern-visual"
import type { PublicPortfolioData } from "@/lib/public-types"
import Link from "next/link"

interface Props {
  params: Promise<{ username: string }>
}

function renderTemplate(portfolio: PublicPortfolioData) {
  switch (portfolio.template) {
    case "classic-pro":
      return <ClassicProTemplate portfolio={portfolio} />
    case "modern-visual":
      return <ModernVisualTemplate portfolio={portfolio} />
    default:
      return <ClassicProTemplate portfolio={portfolio} />
  }
}

export default async function PortfolioPage(props: Props) {
  const params = await props.params
  const portfolio = await getPublicPortfolio(params.username)

  if (!portfolio) {
    // In real app, we might check if user exists but has no portfolio, or just generic 404
    // Since we don't have a list of "all public portfolios" readily available here without another query, 
    // we will simplify the 404 page.

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Portfolio not found</h1>
          <p className="text-muted-foreground mb-6">
            The portfolio '{params.username}' doesn't exist or hasn't been published yet.
          </p>
          <Link href="/dashboard/portfolios" className="text-primary hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return renderTemplate(portfolio)
}
