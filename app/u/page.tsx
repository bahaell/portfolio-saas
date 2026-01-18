// import { publicPortfolios } from "@/lib/public-mock-data"
import Link from "next/link"

export const metadata = {
  title: "Public Portfolios | Portfora",
  description: "Explore amazing portfolios created with Portfora",
}

export default function PublioPortfoliosIndex() {
  const portfolios: any[] = [] // Object.values(publicPortfolios).filter((p) => p.published)
  // Mock data disabled.

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5FBE6" }}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Explore Portfolios</h1>
          <p className="text-lg text-muted-foreground">Discover amazing portfolios built with Portfora</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <Link key={portfolio.id} href={`/u/${portfolio.username}`} className="group">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-border">
                <div
                  className="h-48 bg-gradient-to-br"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${portfolio.theme.primary} 0%, ${portfolio.theme.secondary} 100%)`,
                  }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={portfolio.profile.image || "/placeholder.svg"}
                      alt={portfolio.profile.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">{portfolio.profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{portfolio.profile.title}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{portfolio.profile.bio}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {portfolios.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No public portfolios available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
