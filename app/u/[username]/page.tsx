import { publicPortfolios } from "@/lib/public-mock-data"
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
  const portfolio = publicPortfolios[params.username]

  if (!portfolio) {
    const availablePortfolios = Object.keys(publicPortfolios)

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Portfolio not found</h1>
          <p className="text-muted-foreground mb-6">
            The portfolio '{params.username}' doesn't exist or hasn't been published yet.
          </p>
          {availablePortfolios.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-3">Available portfolios:</p>
              <div className="space-y-2">
                {availablePortfolios.map((username) => (
                  <Link
                    key={username}
                    href={`/u/${username}`}
                    className="block p-2 rounded border border-border hover:bg-muted transition-colors"
                  >
                    /{username}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Link href="/dashboard/portfolios" className="text-primary hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return renderTemplate(portfolio)
}
